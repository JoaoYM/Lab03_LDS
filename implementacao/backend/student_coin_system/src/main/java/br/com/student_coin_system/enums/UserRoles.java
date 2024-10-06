package br.com.student_coin_system.enums;

public enum UserRoles {
    EMPRESA("empresa"),
    PROFESSOR("professor"),
    ALUNO("aluno"),
    ADMIN("admin");

    private String role;

    UserRoles(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}