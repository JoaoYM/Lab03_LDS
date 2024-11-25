package br.com.student_coin_system.service.financeiro;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.student_coin_system.components.exception.GlobalExceptionHandler;
import br.com.student_coin_system.entity.exception.SaldoInsuficienteException;
import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.financeiro.Historico;
import br.com.student_coin_system.entity.instituicao.Vantagem;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.entity.users.Empresa;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.repository.financeiro.ContaCorrenteRepository;
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
    private ContaCorrenteRepository contaCorrenteRepository;

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

    public String resgatarVantagem(Long alunoId, Long vantagemId) {

        Aluno aluno       = alunoRepository.findById(alunoId).orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado."));
        Vantagem vantagem = vantagemRepository.findById(vantagemId).orElseThrow(() -> new IllegalArgumentException("Vantagem não encontrada."));
        Empresa empresa   = vantagem.getEmpresa();

        ContaCorrente contaAluno   = aluno.getContaCorrente();
        ContaCorrente contaEmpresa = empresa.getContaCorrente();

        if (contaAluno.getSaldo().compareTo(vantagem.getCustoMoedas()) < 0) {
            throw new SaldoInsuficienteException("Saldo insuficiente para resgatar a vantagem.");
        }
        else {

            // --------------------------------------------------------//
            // Atualizar saldo da conta corrente do aluno e da empresa //
            // --------------------------------------------------------//
            contaAluno   = contaCorrenteService.debitarValorVantagem(aluno, vantagem.getCustoMoedas());
            contaEmpresa = contaCorrenteService.creditarValorVantagem(empresa, vantagem.getCustoMoedas());

            // Atualizar histórico do aluno
            if (contaAluno.getHistorico() == null) {
                contaAluno.setHistorico(new ArrayList<Historico>());
            }

            contaAluno.getHistorico().add(historicoService.gerarHistorico(aluno.getNome(), empresa.getNome(), BigDecimal.ZERO , vantagem.getCustoMoedas(), contaAluno));
           
            // Atualizar histórico do aluno
            if (contaEmpresa.getHistorico() == null) {
                contaEmpresa.setHistorico(new ArrayList<Historico>());
            }
           
            contaEmpresa.getHistorico().add(historicoService.gerarHistorico(aluno.getNome(), empresa.getNome(), vantagem.getCustoMoedas(), BigDecimal.ZERO, contaEmpresa));
           
            // --------------------------------------------//
            // Atualizar Conta Corrente de Aluno e Empresa //
            // --------------------------------------------//

            contaCorrenteRepository.save(contaAluno);
            contaCorrenteRepository.save(contaEmpresa);
                
            return "Vantagem resgatada com sucesso.";
        }
    }
    
}