package br.com.student_coin_system.repository.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import br.com.student_coin_system.entity.authentication.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    UserDetails findByLogin(String login);
    // UserDetails findById(Long id); // Se der ruim comenta
}