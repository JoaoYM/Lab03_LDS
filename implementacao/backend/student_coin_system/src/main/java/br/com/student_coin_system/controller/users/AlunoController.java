package br.com.student_coin_system.controller.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.repository.users.AlunoRepository;

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