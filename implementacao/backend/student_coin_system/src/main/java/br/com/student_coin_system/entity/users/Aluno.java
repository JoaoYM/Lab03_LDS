package br.com.student_coin_system.entity.users;

import java.util.ArrayList;
import java.util.List;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import br.com.student_coin_system.entity.utils.Endereço;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Instituicao instituicao;

    @ManyToMany
    private List<Curso> curso = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    private ContaCorrente contaCorrente;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id", nullable = true)
    private Endereço endereco;

    private String nome;

    private String email;

    private String cpf;

    private String rg;
}