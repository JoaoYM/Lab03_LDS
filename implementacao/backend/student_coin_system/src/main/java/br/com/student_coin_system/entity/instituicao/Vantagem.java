package br.com.student_coin_system.entity.instituicao;

import br.com.student_coin_system.entity.users.Empresa;
import java.math.BigDecimal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Empresa empresa;
    
    @ManyToOne
    private Instituicao instituicao;
 
    private String     nome;
 
    private String     descricao;
 
    private String     fotoUrl;
 
    private BigDecimal custoMoedas;
}
