package br.com.student_coin_system.service.financeiro;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.student_coin_system.components.exception.GlobalExceptionHandler;
import br.com.student_coin_system.entity.exception.SaldoInsuficienteException;
import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.financeiro.Historico;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.repository.instituicao.VantagemRepository;
import br.com.student_coin_system.repository.users.AlunoRepository;
import br.com.student_coin_system.repository.users.ProfessorRepository;
import br.com.student_coin_system.service.notification.EmailService;
import jakarta.transaction.Transactional;

@Service
public class TransferenciaService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private ContaCorrenteService contaCorrenteService;

    @Autowired
    private HistoricoService historicoService;

    @Autowired
    private EmailService emailService;

    @Transactional
    public List<ContaCorrente> transferirMoedas(Long professorId, Long alunoId, BigDecimal quantidade, String motivo) {
       
        Professor professor = professorRepository.findById(professorId).orElseThrow();
        Aluno aluno         = alunoRepository.findById(alunoId).orElseThrow();

        if (professor.getContaCorrente().getSaldo().compareTo(quantidade) < 0) {
            // Lança a exceção com a mensagem
            throw new SaldoInsuficienteException("Saldo insuficiente para a transferência.");
        }

        ContaCorrente contaProfessor = contaCorrenteService.removerMoedas(professor, quantidade);
        ContaCorrente contaAluno     = contaCorrenteService.adicionarMoedas(aluno, quantidade);

        // Salvar Histórico da Transação
        List<ContaCorrente> contas = salvarTransacaoProfessorAluno(contaProfessor, contaAluno, professor, aluno, quantidade);
        
        return contas;
    }

    @Transactional
    public List<ContaCorrente> salvarTransacaoProfessorAluno(ContaCorrente contaProfessor, ContaCorrente contaAluno, Professor professor, Aluno aluno, BigDecimal quantidade) {
        
        // Atualizar histórico do professor
        if (contaProfessor.getHistorico() == null) {
            contaProfessor.setHistorico(new ArrayList<Historico>());
        }

        contaProfessor.getHistorico().add(historicoService.gerarHistorico(professor.getNome(), aluno.getNome(), BigDecimal.ZERO , quantidade, contaProfessor));
        
        // Atualizar histórico do aluno
        if (contaAluno.getHistorico() == null) {
            contaAluno.setHistorico(new ArrayList<Historico>());
        }

        contaAluno.getHistorico().add(historicoService.gerarHistorico(professor.getNome(), aluno.getNome(), quantidade, BigDecimal.ZERO, contaAluno));

        return List.of(contaProfessor, contaAluno);
    }

    // public void trocarMoedas(Long alunoId, Long vantagemId, BigDecimal quantidade, String motivo) {
    //     Aluno aluno       = alunoRepository.findById(alunoId).orElseThrow();
    //     Vantagem vantagem = vantagemRepository.findById(vantagemId).orElseThrow();

    //     if (aluno.getContaCorrente().getSaldo().compareTo(quantidade) >= 0) {
    //         aluno.getContaCorrente().removerMoedas(LocalDateTime.now(), "Sistema", aluno.getNome(), quantidade);

    //         // Atualizar histórico
    //         aluno.getContaCorrente().getHistorico().add(new Historico(LocalDateTime.now(), aluno.getNome(), vantagem.getNome(), BigDecimal.ZERO, quantidade, aluno.getContaCorrente().getSaldo().subtract(quantidade), aluno.getContaCorrente()));
    //         alunoRepository.save(aluno);

    //         // Notificar aluno por email
    //         emailService.enviarNotificacao(aluno.getEmail(), "Você trocou moedas por uma vantagem!", motivo);
    //     } else {
    //         throw new RuntimeException("Saldo insuficiente");
    //     }
    // }

    // public void efetuarPagamento(Long alunoId, BigDecimal valor, Long idVantagem) {
    //     Aluno aluno       = alunoRepository.findById(alunoId).orElseThrow();
    //     Vantagem vantagem = aluno.getInstituicao().getVantagens().stream().filter(v -> v.getId().equals(idVantagem)).findFirst().orElseThrow();

    //     if (aluno.getContaCorrente().getSaldo().compareTo(valor) >= 0) {
    //         aluno.getContaCorrente().removerMoedas(LocalDateTime.now(), "Sistema", aluno.getNome(), valor);

    //         // Atualizar histórico
    //         aluno.getContaCorrente().getHistorico().add(new Historico(LocalDateTime.now(), aluno.getNome(), vantagem.getNome(), BigDecimal.ZERO, valor, aluno.getContaCorrente().getSaldo().subtract(valor), aluno.getContaCorrente()));
    //         alunoRepository.save(aluno);

    //         // Notificar aluno por email
    //         emailService.enviarNotificacao(aluno.getEmail(), "Pagamento efetuado!", "Você efetuou o pagamento da vantagem " + vantagem.getNome());
    //     } else {
    //         throw new RuntimeException("Saldo insuficiente");
    //     }
    // }

    public String resgatarVantagem(Long alunoId, Long vantagemId) {
        Optional<Aluno> alunoOpt = alunoRepository.findById(alunoId);
        Optional<Vantagem> vantagemOpt = vantagemRepository.findById(vantagemId);
    
        if (alunoOpt.isEmpty() || vantagemOpt.isEmpty()) {
            throw new IllegalArgumentException("Aluno ou Vantagem não encontrada.");
        }
    
        Aluno aluno = alunoOpt.get();
        Vantagem vantagem = vantagemOpt.get();
        ContaCorrente conta = aluno.getContaCorrente();
    
        BigDecimal custo = vantagem.getCustoMoedas();
        BigDecimal saldo = conta.getSaldo();
        if (saldo.compareTo(custo) < 0) {
            throw new SaldoInsuficienteException("Saldo insuficiente para resgatar a vantagem.");
        } 
        else {
            BigDecimal novoSaldo = conta.getSaldo().subtract(custo);
            conta.setSaldo(novoSaldo);

            // Nao consegui resolver o erro de criar o historico
            /*
            Historico historico = new Historico(
                aluno.getNome(),
                vantagem.getEmpresa().getNome(),
                BigDecimal.ZERO,
                custo,
                novoSaldo,
                conta
            );
            conta.getHistorico().add(historico);
            */

            aluno.getContaCorrente().getHistorico().add(new Historico(aluno.getNome(), vantagem.getNome(), BigDecimal.ZERO, custo, aluno.getContaCorrente().getSaldo().subtract(custo), aluno.getContaCorrente()));
            alunoRepository.save(aluno);
        
            // Adicione logs para inspecionar os dados
            System.out.println("Conta antes de salvar: " + conta);
        
            contaCorrenteRepository.save(conta);
        
            System.out.println("Conta após salvar: " + conta);
        
            return "Vantagem resgatada com sucesso.";
        }
    }
    
}