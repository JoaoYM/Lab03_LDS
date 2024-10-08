package br.com.student_coin_system.controller.instituicao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.entity.instituicao.Instituicao;
import br.com.student_coin_system.repository.instituicao.InstituicaoRepository;

@RestController
@RequestMapping("/api/instituicao")
public class InstituicaoController {
    @Autowired
    InstituicaoRepository instituicaoRepository;

    @GetMapping
    public List<Instituicao> getInstituicoes() {
        return instituicaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Instituicao getInstituicao(@PathVariable Long id) {
        return instituicaoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Instituicao createInstituicao(@RequestBody Instituicao departamento) {
        return instituicaoRepository.save(departamento);
    }

    @PutMapping("/{id}")
    public Instituicao updateInstituicao(@PathVariable Long id, @RequestBody Instituicao departamento) {
        return instituicaoRepository.save(departamento);
    }

    @DeleteMapping("/{id}")
    public void deleteInstituicao(@PathVariable Long id) {
        instituicaoRepository.deleteById(id);
    }
}
