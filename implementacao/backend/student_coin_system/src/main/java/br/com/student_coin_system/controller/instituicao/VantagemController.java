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

import br.com.student_coin_system.dto.instituicao.VantagemDTO;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import br.com.student_coin_system.entity.instituicao.Vantagem;
import br.com.student_coin_system.entity.users.Empresa;
import br.com.student_coin_system.repository.instituicao.InstituicaoRepository;
import br.com.student_coin_system.repository.instituicao.VantagemRepository;
import br.com.student_coin_system.repository.users.EmpresaRepository;

@RestController
@RequestMapping("/api/vantagem")
public class VantagemController {

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private EmpresaRepository empresaRepository;
    
    @PostMapping
    public void createVantagem(@RequestBody Vantagem vantagem) {
        vantagemRepository.save(vantagem);
    }

    @PutMapping("/{id}")
    public void updateVantagem(@PathVariable Long id, @RequestBody VantagemDTO vantagem) {

        // Recuperação da entidade a ser atualizada
        Vantagem oldVantagem    = vantagemRepository.findById(id).orElseThrow();
        
        // Recuperação das entidades respectivas aos IDs passados
        Instituicao instituicao = instituicaoRepository.findById(vantagem.getInstituicaoId()).orElseThrow();
        Empresa empresa         = empresaRepository.findById(vantagem.getEmpresaId()).orElseThrow();
        
        // Atualização dos campos
        oldVantagem.setNome(vantagem.getNome());
        oldVantagem.setDescricao(vantagem.getDescricao());
        oldVantagem.setCustoMoedas(vantagem.getCustoMoedas());
        oldVantagem.setInstituicao(instituicao);
        oldVantagem.setEmpresa(empresa);
        oldVantagem.setFotoUrl(vantagem.getFotoUrl());

        vantagemRepository.save(oldVantagem);
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