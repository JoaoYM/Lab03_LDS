package br.com.student_coin_system.controller.instituicao;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.instituicao.InstituicaoDTO;
import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Departamento;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import br.com.student_coin_system.repository.instituicao.InstituicaoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/instituicao")
public class InstituicaoController {
    @Autowired
    InstituicaoRepository instituicaoRepository;

    @GetMapping
    public List<InstituicaoDTO> getInstituicoes() {

        List<Instituicao> instituicoes = instituicaoRepository.findAll();
        
        return instituicoes.stream()
                .map(instituicao -> new InstituicaoDTO(instituicao.getId(), instituicao.getNome()))
                .collect(Collectors.toList());
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

    @GetMapping("/{id}/departamentos")
    public List<Departamento> getDepartamentos(@PathVariable Long id) {
        List<Departamento> departamentos = instituicaoRepository.findById(id).get().getDepartamentos();
        return departamentos;
    }

    @GetMapping("/{id}/cursos")
    public List<Curso> getCursos(@PathVariable Long id) {
        List<Departamento> departamentos = instituicaoRepository.findById(id).get().getDepartamentos();
        return departamentos.stream()
                .map(departamento -> departamento.getCursos())
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}
