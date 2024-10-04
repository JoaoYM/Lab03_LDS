package br.com.student_coin_system.entity.users;

@Entity
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;

    @ManyToOne
    private Departamento departamento;

    @OneToOne
    private ContaCorrente contaCorrente;

    // Getters e Setters
}
