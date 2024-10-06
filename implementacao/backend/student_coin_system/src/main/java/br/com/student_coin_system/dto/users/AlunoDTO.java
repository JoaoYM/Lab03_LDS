package br.com.student_coin_system.dto.users;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Instituicao;

public class AlunoDTO {
    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;
    private Instituicao instituicao;
    private Curso curso;
    private ContaCorrente contaCorrente;

    public AlunoDTO(String nome, String email, String nDocumento, String rg, String endereco) {
        this.nome     = nome;
        this.email    = email;
        this.cpf      = nDocumento;
        this.rg       = rg;
        this.endereco = endereco;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getCpf() {
        return cpf;
    }

    public String getRg() {
        return rg;
    }

    public String getEndereco() {
        return endereco;
    }

    public Instituicao getInstituicao() {
        return instituicao;
    }

    public Curso getCurso() {
        return curso;
    }

    public ContaCorrente getContaCorrente() {
        return contaCorrente;
    }
}


// private String rg;
//     private String endereco;

//     @ManyToOne
//     private Instituicao instituicao;

//     @ManyToOne
//     private Curso curso;

//     @OneToOne
//     private ContaCorrente contaCorrente;

    // public Aluno(Long id, String nome, String email, String nDocumento, String rg, String endereco) {