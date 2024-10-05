package br.com.student_coin_system.controller.users;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.service.financeiro.TransferenciaService;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {
    @Autowired
    private TransferenciaService transferenciaService;

    @PostMapping("/transferir")
    public ResponseEntity<Void> transferirMoedas(@RequestParam Long professorId,
                                                 @RequestParam Long alunoId,
                                                 @RequestParam BigDecimal quantidade,
                                                 @RequestParam String motivo) {
        transferenciaService.transferirMoedas(professorId, alunoId, quantidade, motivo);
        return ResponseEntity.ok().build();
    }
}