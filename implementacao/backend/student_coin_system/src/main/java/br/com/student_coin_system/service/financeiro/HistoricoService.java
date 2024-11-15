package br.com.student_coin_system.service.financeiro;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.financeiro.Historico;

@Service
public class HistoricoService {
    public Historico gerarHistorico(String pagador, String beneficiario, BigDecimal entrada, BigDecimal saida, ContaCorrente contaCorrente) {
        return new Historico(pagador, beneficiario, entrada, saida, contaCorrente.getSaldo(), contaCorrente);
    }
}
