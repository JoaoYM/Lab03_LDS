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
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToMany
    private List<Aluno> alunos = new ArrayList<>();

    @ManyToMany
    private List<Professor> professores = new ArrayList<>();
   
    private String nome;
}