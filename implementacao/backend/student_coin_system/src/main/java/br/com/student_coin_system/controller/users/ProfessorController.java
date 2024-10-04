package br.com.student_coin_system.controller.users;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private TransferenciaService transferenciaService;

    @PostMapping("/transferir")
    public ResponseEntity<Void> transferirMoedas(@RequestParam Long professorId,
                                                 @RequestParam Long alunoId,
                                                 @RequestParam Double quantidade,
                                                 @RequestParam String motivo) {
        transferenciaService.transferirMoedas(professorId, alunoId, quantidade, motivo);
        return ResponseEntity.ok().build();
    }
}