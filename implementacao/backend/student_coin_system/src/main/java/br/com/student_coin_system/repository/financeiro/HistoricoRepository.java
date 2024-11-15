package br.com.student_coin_system.repository.financeiro;

import br.com.student_coin_system.entity.financeiro.Historico;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {

    List<Historico> findByContaCorrenteId(Long id);
}