package br.com.student_coin_system.repository.users;

import br.com.student_coin_system.entity.users.Professor;
import br.com.student_coin_system.entity.utils.Endereço;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereço, Long> {}