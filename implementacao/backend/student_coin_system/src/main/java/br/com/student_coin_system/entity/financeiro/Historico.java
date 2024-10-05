package br.com.student_coin_system.entity.financeiro;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.student_coin_system.entity.users.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Historico {
    public Historico(LocalDateTime dataOperacao, Usuario pagador, Usuario beneficiario, BigDecimal entrada, BigDecimal saida, BigDecimal saldoFinal, ContaCorrente contaCorrente) {
       setDataOperacao(dataOperacao);
       setPagador(pagador);
       setBeneficiario(beneficiario);
       setEntrada(entrada);
       setSaida(saida);
       setSaldoFinal(saldoFinal);
       setContaCorrente(contaCorrente);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataOperacao;
    private Usuario       pagador;
    private Usuario       beneficiario;
    private BigDecimal    entrada;
    private BigDecimal    saida;
    private BigDecimal    saldoFinal;
 
    @ManyToOne
    private ContaCorrente contaCorrente;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataOperacao() {
        return dataOperacao;
    }

    public void setDataOperacao(LocalDateTime dataOperacao) {
        this.dataOperacao = dataOperacao;
    }

    public Usuario getPagador() {
        return pagador;
    }

    public void setPagador(Usuario pagador) {
        this.pagador = pagador;
    }

    public Usuario getBeneficiario() {
        return beneficiario;
    }

    public void setBeneficiario(Usuario beneficiario) {
        this.beneficiario = beneficiario;
    }

    public BigDecimal getEntrada() {
        return entrada;
    }

    public void setEntrada(BigDecimal entrada) {
        this.entrada = entrada;
    }

    public BigDecimal getSaida() {
        return saida;
    }

    public void setSaida(BigDecimal saida) {
        this.saida = saida;
    }

    public BigDecimal getSaldoFinal() {
        return saldoFinal;
    }

    public void setSaldoFinal(BigDecimal saldoFinal) {
        this.saldoFinal = saldoFinal;
    }

    public ContaCorrente getContaCorrente() {
        return contaCorrente;
    }

    public void setContaCorrente(ContaCorrente contaCorrente) {
        this.contaCorrente = contaCorrente;
    }
}