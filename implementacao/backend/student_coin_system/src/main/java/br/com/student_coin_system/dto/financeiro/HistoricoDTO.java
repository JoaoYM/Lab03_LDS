package br.com.student_coin_system.dto.financeiro;

import java.math.BigDecimal;
import java.sql.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HistoricoDTO {
    private Long            id;
    private Date dataOperacao;
    private String          pagador;
    private String beneficiario;
    private BigDecimal entrada;
    private BigDecimal saida;
    private BigDecimal saldoFinal;
}
