package br.com.student_coin_system.repository.users;

import br.com.student_coin_system.entity.authentication.UsuarioDeAcesso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioDeAcesso, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}