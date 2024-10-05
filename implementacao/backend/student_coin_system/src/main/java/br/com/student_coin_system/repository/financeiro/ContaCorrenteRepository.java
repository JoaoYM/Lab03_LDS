package br.com.student_coin_system.repository.financeiro;

import br.com.student_coin_system.entity.financeiro.ContaCorrente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContaCorrenteRepository extends JpaRepository<ContaCorrente, Long> {}