package br.com.student_coin_system.entity.users;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Departamento;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Professor extends Usuario {
    @ManyToOne
    private Departamento departamento;

    @OneToOne
    private ContaCorrente contaCorrente;

    // Getters e Setters
    public Professor(Long id, String nome, String email, String nDocumento, Departamento departamento, Usuario professor) {
        super(id, nome, email, nDocumento);
        this.departamento = departamento;
        this.contaCorrente = new ContaCorrente(professor);
    }

    // Getters e Setters
    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public ContaCorrente getContaCorrente() {
        return contaCorrente;
    }

    public void setContaCorrente(ContaCorrente contaCorrente) {
        this.contaCorrente = contaCorrente;
    }
}
