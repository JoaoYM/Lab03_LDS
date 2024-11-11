package br.com.student_coin_system.dto.users;

import java.util.List;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AlunoDTO {
    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;
    private Long instituicaoId;
    private List<Long> cursosIds;
    private ContaCorrente contaCorrente;

    public AlunoDTO(String nome, String email, String nDocumento, String rg, String endereco) {
        this.nome     = nome;
        this.email    = email;
        this.cpf      = nDocumento;
        this.rg       = rg;
        this.endereco = endereco;
    }
}