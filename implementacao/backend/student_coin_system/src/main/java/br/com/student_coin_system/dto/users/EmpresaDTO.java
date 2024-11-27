package br.com.student_coin_system.dto.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmpresaDTO {
    
    private Long   id;
    private String nome;
    private String email;
    private String cnpj;
    private String razaoSocial;
    private Long contaCorrenteId;
}
