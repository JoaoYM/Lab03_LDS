package br.com.student_coin_system.repository.users;

import br.com.student_coin_system.entity.users.Aluno;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    List<Aluno> findByCursoIdIn(List<Long> cursoIds);
    // Você pode adicionar métodos personalizados aqui, se necessário

    Aluno findByEmail(String email);
}