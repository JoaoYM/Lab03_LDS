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

import br.com.student_coin_system.entity.instituicao.Vantagem;
import br.com.student_coin_system.repository.instituicao.VantagemRepository;

@RestController
@RequestMapping("/api/vantagem")
public class VantagemController {

    @Autowired
    private VantagemRepository vantagemRepository;
    
    @PostMapping
    public void createVantagem(@RequestBody Vantagem vantagem) {
        vantagemRepository.save(vantagem);
    }

    @PutMapping("/{id}")
    public void updateVantagem(@RequestBody Vantagem vantagem) {
        vantagemRepository.save(vantagem);
    }

    @DeleteMapping("/{id}")
    public void deleteVantagem(@PathVariable Long id) {
        vantagemRepository.deleteById(id);
    }

    @GetMapping
    public List<Vantagem> getVantagens() {
        return vantagemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Vantagem getVantagem(@PathVariable Long id) {
        return vantagemRepository.findById(id).orElse(null);
    }
}