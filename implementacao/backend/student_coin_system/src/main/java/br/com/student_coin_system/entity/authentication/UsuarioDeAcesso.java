package br.com.student_coin_system.entity.authentication;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class UsuarioDeAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  id;
    
    private String nome;
    private String login;
    private String senha;

    public UsuarioDeAcesso(String nome, String login, String senha) {
        this.nome  = nome;
        this.login = login;
        this.senha = senha;
    }
}