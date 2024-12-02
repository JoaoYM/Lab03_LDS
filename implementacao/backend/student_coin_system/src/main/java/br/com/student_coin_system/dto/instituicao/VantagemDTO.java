package br.com.student_coin_system.dto.instituicao;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VantagemDTO {
    private String     nome;
    private String     descricao;
    private String     fotoUrl;
    private BigDecimal custoMoedas;
    private Long       empresaId;
    private Long       instituicaoId;
}