package br.com.student_coin_system.dto.users;

public class EmpresaDTO {
    private String nome;
    private String email;
    private String cnpj;

    public EmpresaDTO(String nome, String email, String cnpj) {
        this.nome  = nome;
        this.email = email;
        this.cnpj  = cnpj;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getCnpj() {
        return cnpj;
    }
}
