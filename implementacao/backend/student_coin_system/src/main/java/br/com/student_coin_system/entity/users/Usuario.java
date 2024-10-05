package br.com.student_coin_system.entity.users;

import lombok.Data;

@Data
public abstract class Usuario {
    private Long   id;
    private String nome;
    private String email;
    private String nDocumento;

    public Usuario() {
    }

    public Usuario(Long id, String nome, String email, String nDocumento) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.nDocumento = nDocumento;
    }
}
