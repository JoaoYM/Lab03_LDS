package br.com.student_coin_system.dto.users;

import java.util.List;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.utils.Endereço;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AlunoDTO {
    private Long   id;
    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private Endereço endereco;
    private String instituicaoNome;
    private Long   instituicaoId;
    private List<Long> cursosIds;
    private List<String> cursosNomes;
    private Long contaCorrenteId;

    public AlunoDTO(String nome, String email, String nDocumento, String rg, Endereço endereco) {
        this.nome     = nome;
        this.email    = email;
        this.cpf      = nDocumento;
        this.rg       = rg;
        this.endereco = endereco;
    }
}