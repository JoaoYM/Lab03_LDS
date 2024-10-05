package br.com.student_coin_system.repository.financeiro;

import br.com.student_coin_system.entity.financeiro.Historico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}