package br.com.student_coin_system.entity.financeiro;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import br.com.student_coin_system.entity.users.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class ContaCorrente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Usuario usuario;
    private BigDecimal  saldo;

    public ContaCorrente(Usuario usuario) {
        this.historico = new ArrayList<>();
        this.saldo = BigDecimal.ZERO; // ou outro valor padrão
    }

    @OneToMany(mappedBy = "contaCorrente")
    private List<Historico> historico;

    public void adicionarMoedas(LocalDateTime data, Usuario pagador, Usuario beneficiario, BigDecimal valor) {
        setSaldo(this.saldo.add(valor));
        this.historico.add(new Historico(data, pagador, beneficiario, valor, BigDecimal.ZERO, this.saldo, this));
    }

    public void removerMoedas(LocalDateTime data, Usuario pagador, Usuario beneficiario, BigDecimal valor) {
        setSaldo(this.saldo.subtract(valor));
        this.historico.add(new Historico(data, pagador, beneficiario, BigDecimal.ZERO, valor, this.saldo, this));
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public List<Historico> getHistorico() {
        return historico;
    }

    public void setHistorico(List<Historico> historico) {
        this.historico = historico;
    }
}