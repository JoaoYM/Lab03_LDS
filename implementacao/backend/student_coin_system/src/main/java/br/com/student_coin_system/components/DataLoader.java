package br.com.student_coin_system.components;

import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Departamento;
import br.com.student_coin_system.entity.instituicao.Instituicao;
import br.com.student_coin_system.entity.instituicao.Vantagem;
import br.com.student_coin_system.entity.users.Empresa;
import br.com.student_coin_system.repository.instituicao.CursoRepository;
import br.com.student_coin_system.repository.instituicao.DepartamentoRepository;
import br.com.student_coin_system.repository.instituicao.InstituicaoRepository;
import br.com.student_coin_system.repository.instituicao.VantagemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
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
    private VantagemRepository vantagemRepository;

    // Arrays pré-cadastrados
    private final String[] cursos = {
        "Engenharia da Computação",
        "Administração",
        "Psicologia",
        "Direito",
        "Arquitetura"
    };

    private final String[] departamentos = {
        "Departamento de Ciências Exatas",
        "Departamento de Humanas",
        "Departamento de Saúde",
        "Departamento de Engenharia",
        "Departamento de Direito"
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
        criarInstituicoes();
    }

    private void criarInstituicoes() {
        if (instituicaoRepository.count() == 0) {
            for (int i = 1; i <= 3; i++) {
                Instituicao instituicao = new Instituicao();
                instituicao.setNome("Universidade Exemplar " + i);
                instituicao.setCnpj("12.345.678/000" + (i + 8) + "-99");
                instituicao.setCursos(new ArrayList<>());
                instituicao.setDepartamentos(new ArrayList<>());
                instituicao.setVantagens(new ArrayList<>());

                instituicaoRepository.save(instituicao);

                criarDepartamentos(instituicao);
                criarCursos(instituicao);
                criarVantagens(instituicao);
            }
        }
    }

    private void criarDepartamentos(Instituicao instituicao) {
        for (int i = 0; i < 3; i++) { // Garante 3 departamentos
            Departamento departamento = new Departamento();
            departamento.setNome(departamentos[i % departamentos.length] + " - " + instituicao.getNome());
            departamento.setProfessores(new ArrayList<>());

            departamentoRepository.save(departamento);
        }
    }

    private void criarCursos(Instituicao instituicao) {
        for (int i = 0; i < 3; i++) { // Garante 3 cursos
            Curso curso = new Curso();
            curso.setNome(cursos[i % cursos.length] + " - " + instituicao.getNome());
            curso.setAlunos(new ArrayList<>());

            cursoRepository.save(curso);
        }
    }

    private void criarVantagens(Instituicao instituicao) {
        Empresa empresa = null; // Adicione lógica para associar uma empresa, se necessário

        for (int i = 0; i < 3; i++) { // Garante 3 vantagens
            Vantagem vantagem = new Vantagem();
            vantagem.setNome(vantagens[i % vantagens.length] + " para " + instituicao.getNome());
            vantagem.setDescricao("Descrição da " + vantagens[i % vantagens.length]);
            vantagem.setCustoMoedas(new BigDecimal("100" + i));
            vantagem.setEmpresa(empresa);
            vantagem.setInstituicao(instituicao);

            vantagemRepository.save(vantagem);
        }
    }
}