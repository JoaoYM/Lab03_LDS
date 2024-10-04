package br.com.student_coin_system.entity.system;

@Entity
public class ContaCorrente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double saldo;

    @OneToMany(mappedBy = "contaCorrente")
    private List<Historico> historico;

    public void adicionarMoedas(Double valor) {
        this.saldo += valor;
    }

    public void removerMoedas(Double valor) {
        this.saldo -= valor;
    }

    // Getters e Setters
}