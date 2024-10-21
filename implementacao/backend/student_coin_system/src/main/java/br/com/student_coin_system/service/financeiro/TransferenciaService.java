package br.com.student_coin_system.service.financeiro;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.student_coin_system.entity.financeiro.Historico;
import br.com.student_coin_system.entity.instituicao.Vantagem;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.repository.users.AlunoRepository;
import br.com.student_coin_system.repository.users.ProfessorRepository;
import br.com.student_coin_system.service.notification.EmailService;
import java.time.LocalDateTime;

@Service
public class TransferenciaService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private EmailService emailService;

    public void transferirMoedas(Long professorId, Long alunoId, BigDecimal quantidade, String motivo) {
        Professor professor = professorRepository.findById(professorId).orElseThrow();
        Aluno aluno         = alunoRepository.findById(alunoId).orElseThrow();

        if (professor.getContaCorrente().getSaldo().compareTo(quantidade) >= 0) {
            professor.getContaCorrente().removerMoedas(LocalDateTime.now(), professor.getNome(), aluno.getNome(), quantidade);
            aluno.getContaCorrente().adicionarMoedas(LocalDateTime.now(), professor.getNome(), aluno.getNome(), quantidade);

            // Atualizar histórico
            professor.getContaCorrente().getHistorico().add(new Historico(LocalDateTime.now(), professor.getNome(), aluno.getNome(), BigDecimal.ZERO, quantidade, professor.getContaCorrente().getSaldo().subtract(quantidade), professor.getContaCorrente()));
            professorRepository.save(professor);

            aluno.getContaCorrente().getHistorico().add(new Historico(LocalDateTime.now(), professor.getNome(), aluno.getNome(), quantidade, BigDecimal.ZERO, aluno.getContaCorrente().getSaldo().add(quantidade), aluno.getContaCorrente()));
            alunoRepository.save(aluno);

            // Notificar aluno por email
            emailService.enviarNotificacao(aluno.getEmail(), "Você recebeu moedas!", motivo);
        } else {
            throw new RuntimeException("Saldo insuficiente");
        }
    }

    public void efetuarPagamento(Long alunoId, BigDecimal valor, Long idVantagem) {
        Aluno aluno       = alunoRepository.findById(alunoId).orElseThrow();
        Vantagem vantagem = aluno.getInstituicao().getVantagens().stream().filter(v -> v.getId().equals(idVantagem)).findFirst().orElseThrow();

        if (aluno.getContaCorrente().getSaldo().compareTo(valor) >= 0) {
            aluno.getContaCorrente().removerMoedas(LocalDateTime.now(), "Sistema", aluno.getNome(), valor);

            // Atualizar histórico
            aluno.getContaCorrente().getHistorico().add(new Historico(LocalDateTime.now(), aluno.getNome(), vantagem.getNome(), BigDecimal.ZERO, valor, aluno.getContaCorrente().getSaldo().subtract(valor), aluno.getContaCorrente()));
            alunoRepository.save(aluno);

            // Notificar aluno por email
            emailService.enviarNotificacao(aluno.getEmail(), "Pagamento efetuado!", "Você efetuou o pagamento da vantagem " + vantagem.getNome());
        } else {
            throw new RuntimeException("Saldo insuficiente");
        }
    }
}