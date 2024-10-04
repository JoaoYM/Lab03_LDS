package br.com.student_coin_system.entity.system;

@Entity
public class Historico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date dataOperacao;
    private String pagador;
    private String beneficiario;
    private Double entrada;
    private Double saida;
    private Double saldoFinal;

    @ManyToOne
    private ContaCorrente contaCorrente;

    // Getters e Setters
}