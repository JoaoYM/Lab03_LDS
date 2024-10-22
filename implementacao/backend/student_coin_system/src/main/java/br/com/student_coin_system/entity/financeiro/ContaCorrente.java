package br.com.student_coin_system.entity.financeiro;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
@Table(name = "conta_corrente")
public class ContaCorrente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal  saldo;

    @OneToMany(mappedBy = "contaCorrente")
    private List<Historico> historico = new ArrayList<>();

    public ContaCorrente() {
        this.saldo = BigDecimal.ZERO;
    }

    public void adicionarMoedas(LocalDateTime data, String pagador, String beneficiario, BigDecimal valor) {
        setSaldo(this.saldo.add(valor));
        this.historico.add(new Historico(data, pagador, beneficiario, valor, BigDecimal.ZERO, this.saldo, this));
    }

    public void removerMoedas(LocalDateTime data, String pagador, String beneficiario, BigDecimal valor) {
        setSaldo(this.saldo.subtract(valor));
        this.historico.add(new Historico(data, pagador, beneficiario, BigDecimal.ZERO, valor, this.saldo, this));
    }
}