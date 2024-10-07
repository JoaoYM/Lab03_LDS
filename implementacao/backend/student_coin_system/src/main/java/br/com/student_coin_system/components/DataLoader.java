// // package br.com.student_coin_system.components;


// // import org.springframework.context.ApplicationListener;
// // import org.springframework.context.event.ContextRefreshedEvent;
// // import org.springframework.stereotype.Component;

// // @Component
// // public class DataLoader implements ApplicationListener<ContextRefreshedEvent> {

// //     @Override
// //     public void onApplicationEvent(ContextRefreshedEvent event) {
// //         // criarVantagens();
// //         // criarProfessores();
// //         // criarAlunos();
// //         // criarEmpresas();
// //         // criarInstituicoes();
// //         // criarCursos();
// //         // criarDepartamentos();
// //     }
// // }


// package br.com.student_coin_system.components;

// import br.com.student_coin_system.entity.financeiro.ContaCorrente;
// import br.com.student_coin_system.entity.instituicao.Curso;
// import br.com.student_coin_system.entity.instituicao.Departamento;
// import br.com.student_coin_system.entity.instituicao.Instituicao;
// import br.com.student_coin_system.entity.instituicao.Vantagem;
// import br.com.student_coin_system.entity.users.Aluno;
// import br.com.student_coin_system.entity.users.Empresa;
// import br.com.student_coin_system.entity.users.Professor;
// import br.com.student_coin_system.repository.instituicao.CursoRepository;
// import br.com.student_coin_system.repository.instituicao.DepartamentoRepository;
// import br.com.student_coin_system.repository.instituicao.InstituicaoRepository;
// import br.com.student_coin_system.repository.instituicao.VantagemRepository;
// import br.com.student_coin_system.repository.users.AlunoRepository;
// import br.com.student_coin_system.repository.users.EmpresaRepository;
// import br.com.student_coin_system.repository.users.ProfessorRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.ApplicationListener;
// import org.springframework.context.event.ContextRefreshedEvent;
// import org.springframework.stereotype.Component;

// import java.math.BigDecimal;
// import java.util.ArrayList;

// @Component
// public class DataLoader implements ApplicationListener<ContextRefreshedEvent> {

//     @Autowired
//     private AlunoRepository alunoRepository;

//     @Autowired
//     private EmpresaRepository empresaRepository;

//     @Autowired
//     private ProfessorRepository professorRepository;

//     @Autowired
//     private CursoRepository cursoRepository;

//     @Autowired
//     private DepartamentoRepository departamentoRepository;

//     @Autowired
//     private InstituicaoRepository instituicaoRepository;

//     @Autowired
//     private VantagemRepository vantagemRepository;

//     @Override
//     public void onApplicationEvent(ContextRefreshedEvent event) {
//         criarInstituicoes();
//         criarDepartamentos();
//         criarCursos();
//         criarProfessores();
//         criarAlunos();
//         criarEmpresas();
//         criarVantagens();
//     }

//     private void criarInstituicoes() {
//         Instituicao instituicao = new Instituicao();
//         instituicao.setNome("Universidade Exemplar");
//         instituicao.setCnpj("12.345.678/0001-99");
//         instituicao.setCursos(new ArrayList<>());
//         instituicao.setDepartamentos(new ArrayList<>());
//         instituicao.setVantagens(new ArrayList<>());

//         instituicaoRepository.save(instituicao);
//     }

//     private void criarDepartamentos() {
//         Departamento departamento = new Departamento();
//         departamento.setNome("Departamento de Ciências Exatas");
//         departamento.setProfessores(new ArrayList<>());

//         departamentoRepository.save(departamento);
//     }

//     private void criarCursos() {
//         Curso curso = new Curso();
//         curso.setNome("Engenharia da Computação");
//         curso.setAlunos(new ArrayList<>());

//         cursoRepository.save(curso);
//     }

//     private void criarProfessores() {
//         Departamento departamento = departamentoRepository.findAll().get(0);
//         ContaCorrente contaCorrente = new ContaCorrente(); // criar os atributos adequados para a conta

//         Professor professor = new Professor();
//         professor.setNome("Dr. José Silva");
//         professor.setCpf("123.456.789-00");
//         professor.setEmail("jose.silva@exemplo.com");
//         professor.setDepartamento(departamento);
//         professor.setContaCorrente(contaCorrente);

//         professorRepository.save(professor);
//     }

//     private void criarAlunos() {
//         Instituicao instituicao = instituicaoRepository.findAll().get(0);
//         Curso curso = cursoRepository.findAll().get(0);
//         ContaCorrente contaCorrente = new ContaCorrente(); // criar os atributos adequados para a conta

//         Aluno aluno = new Aluno();
//         aluno.setNome("Maria Oliveira");
//         aluno.setCpf("987.654.321-00");
//         aluno.setEmail("maria.oliveira@exemplo.com");
//         aluno.setEndereco("Rua das Flores, 123");
//         aluno.setInstituicao(instituicao);
//         aluno.setCurso(curso);
//         aluno.setContaCorrente(contaCorrente);

//         alunoRepository.save(aluno);
//     }

//     private void criarEmpresas() {
//         ContaCorrente contaCorrente = new ContaCorrente(); // criar os atributos adequados para a conta

//         Empresa empresa = new Empresa();
//         empresa.setNome("Empresa Exemplar Ltda.");
//         empresa.setCnpj("12.345.678/0001-00");
//         empresa.setRazaoSocial("Empresa Exemplar");
//         empresa.setEmail("contato@empresaexemplar.com");
//         empresa.setContaCorrente(contaCorrente);

//         empresaRepository.save(empresa);
//     }

//     private void criarVantagens() {
//         Instituicao instituicao = instituicaoRepository.findAll().get(0);
//         Empresa empresa = empresaRepository.findAll().get(0);

//         Vantagem vantagem = new Vantagem();
//         vantagem.setNome("Desconto na Livraria");
//         vantagem.setDescricao("20% de desconto em livros acadêmicos.");
//         vantagem.setCustoMoedas(new BigDecimal("50"));
//         vantagem.setEmpresa(empresa);
//         vantagem.setInstituicao(instituicao);

//         vantagemRepository.save(vantagem);
//     }
// }
 