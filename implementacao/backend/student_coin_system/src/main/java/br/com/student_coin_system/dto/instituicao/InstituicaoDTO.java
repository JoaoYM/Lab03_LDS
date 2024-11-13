package br.com.student_coin_system.dto.instituicao;

import lombok.Data;

@Data
public class InstituicaoDTO {

    Long id;
    String nome;

    public InstituicaoDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
}
