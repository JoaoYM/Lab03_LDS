package br.com.student_coin_system.entity.instituicao;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "instituicao")
public class Instituicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    private List<Curso> cursos               = new ArrayList<>();
    
    @OneToMany
    private List<Departamento> departamentos = new ArrayList<>();
    
    @OneToMany
    private List<Vantagem> vantagens         = new ArrayList<>();
    
    private String nome;

    private String cnpj;
}
