package br.com.student_coin_system.controller.users;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAluno(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(aluno);
    }
}