package br.com.student_coin_system.repository.instituicao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.student_coin_system.entity.instituicao.Vantagem;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Long> {

}