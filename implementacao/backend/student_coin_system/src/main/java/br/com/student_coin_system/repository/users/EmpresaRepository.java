package br.com.student_coin_system.repository.users;

import br.com.student_coin_system.entity.users.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}