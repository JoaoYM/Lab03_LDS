package br.com.student_coin_system.entity.users;

@Data
@Entity
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;

    @ManyToOne
    private Instituicao instituicao;

    @ManyToOne
    private Curso curso;

    @OneToOne
    private ContaCorrente contaCorrente;

    // Getters e Setters
}