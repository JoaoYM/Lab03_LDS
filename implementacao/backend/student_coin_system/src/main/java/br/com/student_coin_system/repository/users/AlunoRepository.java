package br.com.student_coin_system.repository.users;

import br.com.student_coin_system.entity.users.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}