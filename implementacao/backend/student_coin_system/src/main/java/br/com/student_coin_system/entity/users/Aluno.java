package br.com.student_coin_system.entity.users;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "aluno")
public class Aluno{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long   id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Instituicao instituicao;

    @ManyToOne
    private Curso curso;

    // @OneToOne
    // private ContaCorrente contaCorrente;
    @OneToOne(cascade = CascadeType.ALL)
    private ContaCorrente contaCorrente;

    private String nome;

    private String email;

    private String cpf;

    private String rg;

    private String endereco;
}