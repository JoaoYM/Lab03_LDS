package br.com.student_coin_system.controller.financeiro;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.financeiro.Historico;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.entity.users.Empresa;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.repository.financeiro.ContaCorrenteRepository;
import br.com.student_coin_system.repository.users.AlunoRepository;
import br.com.student_coin_system.repository.users.EmpresaRepository;
import br.com.student_coin_system.repository.users.ProfessorRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/conta-corrente")
public class ContaCorrenteController {

    @Autowired
    AlunoRepository       alunoRepository;

    @Autowired
    ProfessorRepository   professorRepository;
    
    @Autowired
    EmpresaRepository     empresaRepository;

    @Autowired
    ContaCorrenteRepository contaCorrenteRepository;
        
    @GetMapping("/historico")
    public List<Historico> getHistoricoConta(@RequestParam Long id, @RequestParam String role) {

        if(role.equals("aluno")){
            Optional<Aluno> aluno = alunoRepository.findById(id);
            if(aluno.isPresent()){
                return aluno.get().getContaCorrente().getHistorico();
            }
        }else if(role.equals("professor")){
            Optional<Professor> professor = professorRepository.findById(id);
            if(professor.isPresent()){
                return professor.get().getContaCorrente().getHistorico();
            }
        }else if(role.equals("empresa")){
            Optional<Empresa> empresa = empresaRepository.findById(id);
            if(empresa.isPresent()){
                return empresa.get().getContaCorrente().getHistorico();
            }
        }

        return null;
    }

    @GetMapping("/contas")
    public List<ContaCorrente> getContas() {
        return contaCorrenteRepository.findAll();
    }
}
