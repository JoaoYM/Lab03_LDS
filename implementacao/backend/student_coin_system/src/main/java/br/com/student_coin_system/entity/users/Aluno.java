package br.com.student_coin_system.entity.users;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Aluno extends Usuario {
    private String rg;
    private String endereco;

    @ManyToOne
    private Instituicao instituicao;

    @ManyToOne
    private Curso curso;

    @OneToOne
    private ContaCorrente contaCorrente;

    public Aluno(Long id, String nome, String email, String nDocumento, String rg, String endereco) {
        super(id, nome, email, nDocumento);
        this.rg       = rg;
        this.endereco = endereco;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Instituicao getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(Instituicao instituicao) {
        this.instituicao = instituicao;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public ContaCorrente getContaCorrente() {
        return contaCorrente;
    }

    public void setContaCorrente(ContaCorrente contaCorrente) {
        this.contaCorrente = contaCorrente;
    }
}