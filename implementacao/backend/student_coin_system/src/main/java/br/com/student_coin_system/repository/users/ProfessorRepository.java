package br.com.student_coin_system.repository.users;

import br.com.student_coin_system.entity.users.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Professor findByEmail(String email);
    // Você pode adicionar métodos personalizados aqui, se necessário
}