package br.com.student_coin_system.controller.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.users.AlunoDTO;
import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import br.com.student_coin_system.entity.users.Aluno;
import br.com.student_coin_system.enums.UserRoles;
import br.com.student_coin_system.repository.instituicao.CursoRepository;
import br.com.student_coin_system.repository.instituicao.InstituicaoRepository;
import br.com.student_coin_system.repository.users.AlunoRepository;
import br.com.student_coin_system.service.users.UsersService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private UsersService usersService;

    @PostMapping
    public ResponseEntity<Void> cadastrarAluno(@RequestBody AlunoDTO alunoDTO) {

        // Criar uma nova instância de Aluno
        Aluno novoAluno = new Aluno();

        // Definir os atributos do aluno baseados no DTO
        novoAluno.setNome(alunoDTO.getNome());
        novoAluno.setEmail(alunoDTO.getEmail());
        novoAluno.setCpf(alunoDTO.getCpf());
        novoAluno.setRg(alunoDTO.getRg());
        novoAluno.setEndereco(alunoDTO.getEndereco());

        // Buscar o curso pelo ID informado
        Curso curso = cursoRepository.findById(alunoDTO.getCursoId())
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado"));

        // Buscar a instituição pelo ID informado
        Instituicao instituicao = instituicaoRepository.findById(alunoDTO.getInstituicaoId())
                .orElseThrow(() -> new IllegalArgumentException("Instituição não encontrada"));

        // Associar o curso e a instituição ao aluno
        novoAluno.setCurso(curso);
        novoAluno.setInstituicao(instituicao);

        // Criar uma nova conta corrente para o aluno
        novoAluno.setContaCorrente(new ContaCorrente());

        try {
            // Salvar o aluno no banco de dados
            alunoRepository.save(novoAluno);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        // Criar um usuário para o aluno
        User user = new User();
        user.setLogin(alunoDTO.getEmail());
        user.setPassword("12345"); // Você pode usar uma senha gerada ou vinda do DTO
        user.setRole(UserRoles.ALUNO);

        try {
            // Salvar o usuário no banco de dados
            usersService.createUser(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarAluno(@PathVariable Long id, @RequestBody AlunoDTO aluno) {

        Aluno oldAluno = alunoRepository.findById(id).orElseThrow();

        // Buscar o curso pelo ID informado
        Curso curso = cursoRepository.findById(aluno.getCursoId())
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado"));

        // Buscar a instituição pelo ID informado
        Instituicao instituicao = instituicaoRepository.findById(aluno.getInstituicaoId())
                .orElseThrow(() -> new IllegalArgumentException("Instituição não encontrada"));

        oldAluno.setNome(aluno.getNome());
        oldAluno.setEmail(aluno.getEmail());
        oldAluno.setRg(aluno.getRg());
        oldAluno.setEndereco(aluno.getEndereco());
        oldAluno.setCurso(curso);
        oldAluno.setContaCorrente(aluno.getContaCorrente());
        oldAluno.setInstituicao(instituicao);
        oldAluno.setCpf(aluno.getCpf());

        try {
            alunoRepository.save(oldAluno);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAluno(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(aluno);
    }

    @GetMapping
    public List<Aluno> getAlunos() {
        return alunoRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAluno(@PathVariable Long id) {
        alunoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}