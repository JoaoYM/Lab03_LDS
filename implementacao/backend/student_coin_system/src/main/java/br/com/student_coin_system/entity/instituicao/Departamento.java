package br.com.student_coin_system.entity.instituicao;

import java.util.ArrayList;
import java.util.List;

import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.entity.users.Professor;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "departamento")
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "departamento")
    private List<Professor> professores = new ArrayList<>();

    @ManyToMany
    private List<Aluno> alunos = new ArrayList<>();

    @ManyToOne
    private Instituicao instituicao;

    private String nome;
}
