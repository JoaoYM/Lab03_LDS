package br.com.student_coin_system.dto.financeiro;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class TransferenciaDTO {
    
    Long        professorId;
    Long        alunoId;
    BigDecimal  quantidade; 
    String      motivo;
    
    public TransferenciaDTO(Long professorId, Long alunoId, BigDecimal quantidade, String motivo) {
        this.professorId = professorId;
        this.alunoId = alunoId;
        this.quantidade = quantidade;
        this.motivo = motivo;
    }
}
