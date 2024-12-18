package br.com.student_coin_system.controller.financeiro;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.financeiro.TransferenciaDTO;
import br.com.student_coin_system.entity.exception.SaldoInsuficienteException;
import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.financeiro.Historico;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.entity.users.Empresa;
import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.repository.financeiro.ContaCorrenteRepository;
import br.com.student_coin_system.repository.users.AlunoRepository;
import br.com.student_coin_system.repository.users.EmpresaRepository;
import br.com.student_coin_system.repository.users.ProfessorRepository;
import br.com.student_coin_system.service.financeiro.TransferenciaService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/conta-corrente")
public class ContaCorrenteController {

    @Autowired
    private TransferenciaService transferenciaService;

    @Autowired
    AlunoRepository alunoRepository;

    @Autowired
    ProfessorRepository professorRepository;

    @Autowired
    EmpresaRepository empresaRepository;

    @Autowired
    ContaCorrenteRepository contaCorrenteRepository;

    @GetMapping("/historico")
    public List<Historico> getHistoricoConta(@RequestParam Long id, @RequestParam String role) {

        if (role.equals("aluno")) {
            Optional<Aluno> aluno = alunoRepository.findById(id);
            if (aluno.isPresent()) {
                return aluno.get().getContaCorrente().getHistorico();
            }
        } else if (role.equals("professor")) {
            Optional<Professor> professor = professorRepository.findById(id);
            if (professor.isPresent()) {
                return professor.get().getContaCorrente().getHistorico();
            }
        } else if (role.equals("empresa")) {
            Optional<Empresa> empresa = empresaRepository.findById(id);
            if (empresa.isPresent()) {
                return empresa.get().getContaCorrente().getHistorico();
            }
        }

        return null;
    }

    // @PostMapping("/transferirMoedas")
    // public ResponseEntity<String> transferirMoedas(@RequestBody TransferenciaDTO transferencia) {
        
    //     List<ContaCorrente> contas = new ArrayList<>();

    //     try {
    //         contas = transferenciaService.transferirMoedas(transferencia.getProfessorId(), transferencia.getAlunoId(),
    //             transferencia.getQuantidade(), transferencia.getMotivo());

    //         contaCorrenteRepository.saveAll(contas);
    //         return ResponseEntity.ok().build();
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     } 

      
    //     return ResponseEntity.badRequest().build();
    // }

    @PostMapping("/transferirMoedas")
    public ResponseEntity<String> transferirMoedas(@RequestBody TransferenciaDTO transferencia) {
        List<ContaCorrente> contas = new ArrayList<>();

        // Deixe o tratamento de exceções para o ControllerAdvice
        contas = transferenciaService.transferirMoedas(transferencia.getProfessorId(), transferencia.getAlunoId(),
                transferencia.getQuantidade(), transferencia.getMotivo());

        contaCorrenteRepository.saveAll(contas);
        return ResponseEntity.ok().build();
    }

    // @PostMapping("/trocarMoedas")
    // public ResponseEntity<Void> trocarMoedas(@RequestParam Long alunoId,
    //         @RequestParam Long vantagemId,
    //         @RequestParam BigDecimal quantidade,
    //         @RequestParam String motivo) {
    //     transferenciaService.trocarMoedas(alunoId, vantagemId, quantidade, motivo);
    //     return ResponseEntity.ok().build();
    // }

    @GetMapping("/contas")
    public List<ContaCorrente> getContas() {
        return contaCorrenteRepository.findAll();
    }

    @PostMapping("/resgatar-vantagem")
    public ResponseEntity<String> resgatarVantagem(@RequestParam Long alunoId, @RequestParam Long vantagemId) {
        try {
            String mensagem = transferenciaService.resgatarVantagem(alunoId, vantagemId);
            return ResponseEntity.ok(mensagem);
        } catch (SaldoInsuficienteException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao resgatar vantagem: " + e.getMessage());
        }
    }
}
