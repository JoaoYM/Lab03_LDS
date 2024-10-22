package br.com.student_coin_system.controller.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.users.AlunoDTO;
import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.enums.UserRoles;
import br.com.student_coin_system.repository.users.AlunoRepository;
import br.com.student_coin_system.service.users.UsersService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private UsersService usersService;

    @PostMapping
    public ResponseEntity<Void> cadastrarAluno(@RequestBody Aluno aluno) {
        
        try{
            alunoRepository.save(aluno);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }

        User user = new User();

        user.setLogin(aluno.getEmail());
        user.setPassword("12345");
        user.setRole(UserRoles.ALUNO);

        try {
            usersService.createUser(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarAluno(@PathVariable Long id, @RequestBody AlunoDTO aluno) {
        
        Aluno oldAluno = alunoRepository.findById(id).orElseThrow();
        
        oldAluno.setNome(aluno.getNome());
        oldAluno.setEmail(aluno.getEmail());
        oldAluno.setRg(aluno.getRg());
        oldAluno.setEndereco(aluno.getEndereco());
        //oldAluno.setCurso(aluno.getCurso());
        oldAluno.setContaCorrente(aluno.getContaCorrente());
        oldAluno.setInstituicao(aluno.getInstituicao());
        oldAluno.setCpf(aluno.getCpf());

        try{
            alunoRepository.save(oldAluno);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAluno(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(aluno);
    }

    @GetMapping
    public List<Aluno> getAlunos() {
        return alunoRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteAluno(@PathVariable Long id) {
        alunoRepository.deleteById(id);
    }
}