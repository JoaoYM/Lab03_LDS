package br.com.student_coin_system.dto.users;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Departamento;

public class ProfessorDTO {

    private Long   id;
    private String nome;
    private String email;
    private String cpf;
    private Departamento  departamento;
    private ContaCorrente contaCorrente;

    public ProfessorDTO(String nome, String email, String cpf, Departamento  departamento, ContaCorrente contaCorrente) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.departamento = departamento;
        this.contaCorrente = contaCorrente;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getcpf() {
        return cpf;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public ContaCorrente getContaCorrente() {
        return contaCorrente;
    }
}
