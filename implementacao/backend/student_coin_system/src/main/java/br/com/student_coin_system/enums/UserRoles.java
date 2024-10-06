package br.com.student_coin_system.enums;

public enum UserRoles {
    EMPRESA("EMPRESA"),
    PROFESSOR("PROFESSOR"),
    ALUNO("ALUNO");

    private String role;

    UserRoles(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
