package br.com.student_coin_system.entity.system;

@Entity
public class Vantagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private String fotoUrl;
    private Double custoMoedas;

    @ManyToOne
    private Empresa empresa;

    // Getters e Setters
}
