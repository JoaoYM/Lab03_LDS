package br.com.student_coin_system.controller.users;

import java.util.List;

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

import br.com.student_coin_system.dto.users.EmpresaDTO;
import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.users.Empresa;
import br.com.student_coin_system.enums.UserRoles;
import br.com.student_coin_system.repository.users.EmpresaRepository;
import br.com.student_coin_system.service.users.UsersService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/empresa")
public class EmpresaController {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private UsersService usersService;

    @PostMapping
    public ResponseEntity<Void> cadastrarEmpresa(@RequestBody Empresa empresa) {
        empresa.setContaCorrente(new ContaCorrente());
        empresaRepository.save(empresa);

        User user = new User();

        user.setLogin(empresa.getEmail());
        user.setPassword("12345");
        user.setRole(UserRoles.EMPRESA);

        try {
            usersService.createUser(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarEmpresa(@PathVariable Long id, @RequestBody EmpresaDTO empresa) {
        Empresa oldEmpresa = empresaRepository.findById(id).orElseThrow();

        oldEmpresa.setNome(empresa.getNome());
        oldEmpresa.setEmail(empresa.getEmail());
        oldEmpresa.setCnpj(empresa.getCnpj()); 

        try {
            empresaRepository.save(oldEmpresa);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Empresa> getEmpresas() {
        return empresaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Empresa getEmpresa(@PathVariable Long id) {
        return empresaRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEmpresa(@PathVariable Long id) {
        empresaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}