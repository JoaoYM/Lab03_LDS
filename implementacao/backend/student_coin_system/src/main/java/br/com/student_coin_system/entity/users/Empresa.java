package br.com.student_coin_system.entity.users;

public class Empresa extends Usuario {
    private String cnpj;
    private String razaoSocial;

    public Empresa() {
    }

    public Empresa(Long id, String nome, String email, String nDocumento, String cnpj, String razaoSocial) {
        super(id, nome, email, nDocumento);
        this.cnpj        = cnpj;
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

}
