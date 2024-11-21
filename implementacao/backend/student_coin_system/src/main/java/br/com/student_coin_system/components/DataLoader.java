package br.com.student_coin_system.components;

import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Departamento;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import br.com.student_coin_system.enums.UserRoles;
import br.com.student_coin_system.repository.instituicao.CursoRepository;
import br.com.student_coin_system.repository.instituicao.DepartamentoRepository;
import br.com.student_coin_system.repository.instituicao.InstituicaoRepository;
import br.com.student_coin_system.repository.instituicao.VantagemRepository;
import br.com.student_coin_system.repository.users.UserRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DataLoader implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private InstituicaoRepository instituicaoRepository;   

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Arrays pré-cadastrados
    

    private final String[] nomesDepartamentos = {
        "Departamento de Ciências Exatas",
        "Departamento de Humanas",
        "Departamento de Saúde",
    };

    private final String[] cursosCienciasExatas = {
        "Engenharia da Computação",
        "Engenharia Elétrica",
        "Engenharia Mecânica",
    };

    private final String[] cursosHumanas = {
        "Administração",
        "Psicologia",
        "Direito",
    };

    private final String[] cursosSaude = {
        "Medicina",
        "Enfermagem",
        "Fisioterapia",
    };

    private final String[] vantagens = {
        "Desconto em Livraria",
        "Desconto na Lanchonete",
        "Desconto na Mensalidade",
        "Acesso a Eventos",
        "Estágio Garantido"
    };

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
      
        // criarInstituicoes();

        if(userRepository.findByLogin("admin@teste.com") == null){
            criarAdmin();
        }
    }

    private void criarInstituicoes() {

        List <Instituicao> instituicoes = instituicaoRepository.findAll();

        instituicoes.forEach(instituicao -> {
            criarDepartamentos(instituicao);
        });
    }

    private void criarAdmin() {
        User user = new User();

        user.setLogin("admin@teste.com");
        user.setPassword(passwordEncoder.encode("12345"));
        user.setRole(UserRoles.ADMIN);

        userRepository.save(user);
    }

    private void criarDepartamentos(Instituicao instituicao) {

        List <Departamento> departamentos = new ArrayList<>();

        
        for (int i = 0; i < 3; i++) { 

            Departamento departamento = new Departamento();

            departamento.setNome( nomesDepartamentos[i] + " " + instituicao.getNome());
            departamento.setCursos(new ArrayList<>());
            departamento.setProfessores(new ArrayList<>());

            departamentos.add(departamento);

            criarCursos(departamento, nomesDepartamentos[i]);
        }

        instituicao.setDepartamentos(departamentos);
        
        instituicaoRepository.save(instituicao);
    }
    

    private void criarCursos(Departamento departamento, String departamentoNome) {
        
        List <Curso> cursos = new ArrayList<>();
        
        switch (departamentoNome) {
            case ("Departamento de Ciências Exatas"):
                for (int i = 0; i < cursosCienciasExatas.length - 1; i++) { 
                    Curso curso = new Curso();
        
                    curso.setNome(cursosCienciasExatas[i]);
                    curso.setAlunos(new ArrayList<>());
                    curso.setProfessores(new ArrayList<>());
                    cursoRepository.save(curso);
        
                    cursos.add(curso);
                }
                break;
            case "Departamento de Humanas":
                for (int i = 0; i < cursosHumanas.length - 1; i++) { 
                    Curso curso = new Curso();
        
                    curso.setNome(cursosHumanas[i]);
                    curso.setAlunos(new ArrayList<>());
                    curso.setProfessores(new ArrayList<>());
                    cursoRepository.save(curso);
        
                    cursos.add(curso);
                }
                break;
            case "Departamento de Saúde":
                for (int i = 0; i < cursosSaude.length - 1; i++) { 
                    Curso curso = new Curso();
        
                    curso.setNome(cursosSaude[i]);
                    curso.setAlunos(new ArrayList<>());
                    curso.setProfessores(new ArrayList<>());
                    cursoRepository.save(curso);
        
                    cursos.add(curso);
                }
                break;
            default:
                break;
        }

        departamento.setCursos(cursos);
   
        
        departamentoRepository.save(departamento);
    }
}