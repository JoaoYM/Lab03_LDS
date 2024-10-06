package br.com.student_coin_system.controller.users;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.users.ProfessorDTO;
import br.com.student_coin_system.entity.instituicao.Departamento;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.repository.instituicao.DepartamentoRepository;
import br.com.student_coin_system.repository.users.ProfessorRepository;
import br.com.student_coin_system.service.financeiro.TransferenciaService;


@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private TransferenciaService transferenciaService;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @PostMapping
    public ResponseEntity<Void> cadastrarProfessor(@RequestBody Professor professor) {
        try {
            Optional<Departamento> departamento = departamentoRepository.findById(professor.getId());
            
            if(!departamento.isEmpty()){
                professor.setDepartamento(departamento.get());
            }

            professorRepository.save(professor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarProfessor(@PathVariable Long id, @RequestBody ProfessorDTO professor) {
        Professor oldProfessor = professorRepository.findById(id).orElseThrow();
        oldProfessor.setNome(professor.getNome());
        oldProfessor.setEmail(professor.getEmail());
        oldProfessor.setCpf(professor.getnDocumento());

        try {
            professorRepository.save(oldProfessor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/transferir")
    public ResponseEntity<Void> transferirMoedas(@RequestParam Long professorId,
                                                 @RequestParam Long alunoId,
                                                 @RequestParam BigDecimal quantidade,
                                                 @RequestParam String motivo) {
        transferenciaService.transferirMoedas(professorId, alunoId, quantidade, motivo);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public void deletarProfessor(@PathVariable Long id) {
        professorRepository.deleteById(id);
    }
}