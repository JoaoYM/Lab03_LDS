package br.com.student_coin_system.entity.financeiro;

import java.math.BigDecimal;

import br.com.student_coin_system.entity.users.Empresa;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Vantagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String     descricao;
    private String     fotoUrl;
    private BigDecimal custoMoedas;

    @ManyToOne
    private Empresa empresa;

    public Vantagem(String descricao, String fotoUrl, BigDecimal custoMoedas, Empresa empresa) {
        setDescricao(descricao);
        setFotoUrl(fotoUrl);
        setCustoMoedas(custoMoedas);
        setEmpresa(empresa);
    
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public BigDecimal getCustoMoedas() {
        return custoMoedas;
    }

    public void setCustoMoedas(BigDecimal custoMoedas) {
        this.custoMoedas = custoMoedas;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
}
