package br.com.student_coin_system.entity.users;

import java.util.ArrayList;
import java.util.List;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Vantagem;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "empresa")
public class Empresa{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long   id;

    private String nome;

    private String email;

    private String cnpj;
    
    private String razaoSocial;

    @OneToMany
    private List<Vantagem> vantagem = new ArrayList<>();
    
    // @OneToOne
    // private ContaCorrente contaCorrente;
    @OneToOne(cascade = CascadeType.ALL)
    private ContaCorrente contaCorrente;
}
