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

import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.repository.instituicao.CursoRepository;

@RestController
@RequestMapping("/api/curso")
public class CursoController {
    
        @Autowired
        CursoRepository cursoRepository;
    
        @GetMapping
        public List<Curso> getCursos() {
            return cursoRepository.findAll();
        }
    
        @GetMapping("/{id}")
        public Curso getCurso(@PathVariable Long id) {
            return cursoRepository.findById(id).orElse(null);
        }

        @GetMapping("/{id}/departamento")
        public List<Curso> getCursosDepartamento(@PathVariable List<Long> departamentoIds) {
            return cursoRepository.findByDepartamentosIdIn(departamentoIds);
        }
    
        @PostMapping
        public Curso createCurso(@RequestBody Curso curso) {
            return cursoRepository.save(curso);
        }
    
        @PutMapping("/{id}")
        public Curso updateCurso(@PathVariable Long id, @RequestBody Curso curso) {
            return cursoRepository.save(curso);
        }
    
        @DeleteMapping("/{id}")
        public void deleteCurso(@PathVariable Long id) {
            cursoRepository.deleteById(id);
        }
}
