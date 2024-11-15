package br.com.student_coin_system.controller.users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.users.ProfessorDTO;
import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Departamento;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.enums.UserRoles;
import br.com.student_coin_system.repository.instituicao.DepartamentoRepository;
import br.com.student_coin_system.repository.users.ProfessorRepository;
import br.com.student_coin_system.service.users.UsersService;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/professor")
public class ProfessorController {
    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private UsersService usersService;

    @PostMapping
    public ResponseEntity<Void> cadastrarProfessor(@RequestBody ProfessorDTO professor) {
        try {
            Professor novoProfessor = new Professor();

            Optional<Departamento> departamentoOpt = departamentoRepository.findById(professor.getDepartamentoId());
            if (!departamentoOpt.isPresent()) {
                return ResponseEntity.badRequest().build();
            }

            Departamento departamento = departamentoOpt.get();
            novoProfessor.setNome(professor.getNome());
            novoProfessor.setEmail(professor.getEmail());
            novoProfessor.setCpf(professor.getCpf());
            novoProfessor.setDepartamento(departamento);
            
            novoProfessor.setContaCorrente(new ContaCorrente());

            novoProfessor.getContaCorrente().setSaldo(java.math.BigDecimal.valueOf(1000));
            
            professorRepository.save(novoProfessor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        User user = new User();
        user.setLogin(professor.getEmail());
        user.setPassword("12345"); 
        user.setRole(UserRoles.PROFESSOR); 

        try {
            usersService.createUser(user);
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
        oldProfessor.setCpf(professor.getCpf());

        Optional<Departamento> departamentoOpt = departamentoRepository.findById(professor.getDepartamentoId());
        if (!departamentoOpt.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        oldProfessor.setDepartamento(departamentoOpt.get());
    
        try {
            professorRepository.save(oldProfessor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }   

    @GetMapping
    public Iterable<Professor> getProfessores() {
        return professorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Professor getProfessor(@PathVariable Long id) {
        return professorRepository.findById(id).orElse(null);
    }

    @GetMapping("/login/{email}")
    public ProfessorDTO getProfessorByEmail(@PathVariable String email) {
        
        Professor professor = professorRepository.findByEmail(email);

        ProfessorDTO professorDTO = new ProfessorDTO();

        professorDTO.setId(professor.getId());
        professorDTO.setNome(professor.getNome());
        professorDTO.setEmail(professor.getEmail());
        professorDTO.setCpf(professor.getCpf());
        professorDTO.setDepartamentoId(professor.getDepartamento().getId());
        professorDTO.setContaCorrenteId(professor.getContaCorrente().getId());
        
        return professorDTO;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProfessor(@PathVariable Long id) {
        professorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}