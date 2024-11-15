package br.com.student_coin_system.service.financeiro;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.repository.financeiro.ContaCorrenteRepository;

@Service
public class ContaCorrenteService {

    @Autowired
    ContaCorrenteRepository contaCorrenteRepository;
    
    public ContaCorrente removerMoedas(Professor professor, BigDecimal quantidade) {
       
        ContaCorrente contaProfessor = professor.getContaCorrente();
        BigDecimal saldo = contaProfessor.getSaldo().subtract(quantidade);
        
        contaProfessor.setSaldo(saldo);

        return contaProfessor;
    }

    public ContaCorrente adicionarMoedas(Aluno aluno, BigDecimal quantidade) {
        
        ContaCorrente contaAluno = aluno.getContaCorrente();
        BigDecimal saldo = contaAluno.getSaldo().add(quantidade);

        contaAluno.setSaldo(saldo);
        
        return contaAluno;
    }
}
