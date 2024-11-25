package br.com.student_coin_system.dto.instituicao;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VantagemDTO {
    private String nome;
    private String descricao;
    private String fotoUrl;
    private BigDecimal custoMoedas;
    private Long instituicaoId;
    private Long empresaId;

    public VantagemDTO(String nome, String descricao, String fotoUrl, BigDecimal custoMoedas) {
        this.nome = nome;
        this.descricao = descricao;
        this.fotoUrl = fotoUrl;
        this.custoMoedas = custoMoedas;
    }
}
