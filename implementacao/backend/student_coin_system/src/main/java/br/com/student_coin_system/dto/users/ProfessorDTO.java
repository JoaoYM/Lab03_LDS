package br.com.student_coin_system.dto.users;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfessorDTO {

    private Long   id;
    private String nome;
    private String email;
    private String cpf;
    private Long  departamentoId;
    private ContaCorrente  contaCorrente;

    public ProfessorDTO(String nome, String email, String cpf, Long  departamentoId, ContaCorrente contaCorrente) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.departamentoId = departamentoId;
        this.contaCorrente = contaCorrente;
    }
}
