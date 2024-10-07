package br.com.student_coin_system.entity.instituicao;

import java.util.ArrayList;
import java.util.List;

import br.com.student_coin_system.entity.users.Aluno;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToMany
    private List<Aluno> alunos = new ArrayList<>();
   
    private String nome;
}