package br.com.student_coin_system.repository.instituicao;

import br.com.student_coin_system.entity.instituicao.Curso;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
}