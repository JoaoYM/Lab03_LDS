package br.com.student_coin_system.service.financeiro;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import br.com.student_coin_system.entity.financeiro.Historico;

@Service
public class HistoricoService {
    public Historico debito(String professorNome, String alunoNome, BigDecimal quantidade, BigDecimal saldo) {
        return new Historico(professorNome, alunoNome, BigDecimal.ZERO, quantidade, saldo);
    }

    public Historico credito(String professorNome, String alunoNome, BigDecimal quantidade, BigDecimal saldo) {
        return new Historico(professorNome, alunoNome, quantidade, BigDecimal.ZERO, saldo);
    }
}
