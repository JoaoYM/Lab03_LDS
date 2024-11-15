package br.com.student_coin_system.dto.users;

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
    private Long  contaCorrenteId;

    public ProfessorDTO(String nome, String email, String cpf, Long  departamentoId, Long contaCorrenteId) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.departamentoId  = departamentoId;
        this.contaCorrenteId = contaCorrenteId;
    }
}
