package br.com.student_coin_system.repository.instituicao;

import br.com.student_coin_system.entity.instituicao.Curso;
import br.com.student_coin_system.entity.instituicao.Departamento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
    List<Departamento> findByInstituicaoId(Long instituicaoId);
}