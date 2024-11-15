package br.com.student_coin_system.controller.financeiro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.financeiro.HistoricoDTO;
import br.com.student_coin_system.entity.financeiro.Historico;
import br.com.student_coin_system.repository.financeiro.HistoricoRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/historico-conta")
public class HistoricoContaController {

    @Autowired 
    private HistoricoRepository historicoRepository;

    @GetMapping("/conta/{id}")
    public List<HistoricoDTO> getHistoricoConta(@PathVariable Long id) {

        List<Historico> historico = historicoRepository.findByContaCorrenteId(id);

        return historico.stream().map(h -> {
            HistoricoDTO dto = new HistoricoDTO();
            dto.setId(h.getId());
            dto.setBeneficiario(h.getBeneficiario());
            dto.setPagador(h.getPagador());
            dto.setEntrada(h.getEntrada());
            dto.setSaida(h.getSaida());
            dto.setSaldoFinal(h.getSaldoFinal());
            dto.setDataOperacao(new java.sql.Date(java.sql.Timestamp.valueOf(h.getDataOperacao()).getTime()));
            return dto;
        }).toList();
    }
}
