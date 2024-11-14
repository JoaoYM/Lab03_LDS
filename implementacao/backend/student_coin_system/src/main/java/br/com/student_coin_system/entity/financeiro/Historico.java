package br.com.student_coin_system.entity.financeiro;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "historico")
public class Historico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataOperacao = LocalDateTime.now();
    private String pagador;
    private String beneficiario;
    private BigDecimal entrada;
    private BigDecimal saida;
    private BigDecimal saldoFinal;

    @ManyToOne
    @JoinColumn(name = "conta_corrente_id", nullable = false)
    private ContaCorrente contaCorrente;

    public Historico(String pagador, String beneficiario, BigDecimal entrada, BigDecimal saida, BigDecimal saldoFinal) {
        this.pagador = pagador;
        this.beneficiario = beneficiario;
        this.entrada = entrada;
        this.saida = saida;
        this.saldoFinal = saldoFinal;
    }
}