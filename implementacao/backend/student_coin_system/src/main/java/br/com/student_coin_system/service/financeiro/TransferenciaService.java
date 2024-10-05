package br.com.student_coin_system.service.financeiro;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.student_coin_system.entity.financeiro.Historico;
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
            professor.getContaCorrente().removerMoedas(LocalDateTime.now(), professor, aluno, quantidade); //Date, Usuario, Usuario, BigDecimal
            aluno.getContaCorrente().adicionarMoedas(LocalDateTime.now(), professor, aluno, quantidade);

            // Atualizar histórico
            new Historico(LocalDateTime.now(), professor, aluno, BigDecimal.ZERO, quantidade, professor.getContaCorrente().getSaldo().subtract(quantidade), professor.getContaCorrente());
            new Historico(LocalDateTime.now(), professor, aluno, quantidade, BigDecimal.ZERO, aluno.getContaCorrente().getSaldo().add(quantidade), aluno.getContaCorrente());
            // Salvar os históricos

            // Notificar aluno por email
            emailService.enviarNotificacao(aluno.getEmail(), "Você recebeu moedas!", motivo);
        } else {
            throw new RuntimeException("Saldo insuficiente");
        }
    }
}