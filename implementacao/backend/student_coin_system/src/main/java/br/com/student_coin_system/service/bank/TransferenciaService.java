package br.com.student_coin_system.service.bank;

@Service
public class TransferenciaService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private EmailService emailService;

    public void transferirMoedas(Long professorId, Long alunoId, Double quantidade, String motivo) {
        Professor professor = professorRepository.findById(professorId).orElseThrow();
        Aluno aluno = alunoRepository.findById(alunoId).orElseThrow();

        if (professor.getContaCorrente().getSaldo() >= quantidade) {
            professor.getContaCorrente().removerMoedas(quantidade);
            aluno.getContaCorrente().adicionarMoedas(quantidade);

            // Atualizar histórico
            Historico historicoProfessor = new Historico(...);
            Historico historicoAluno = new Historico(...);
            // Salvar os históricos

            // Notificar aluno por email
            emailService.enviarNotificacao(aluno.getEmail(), "Você recebeu moedas!", motivo);
        } else {
            throw new RuntimeException("Saldo insuficiente");
        }
    }
}