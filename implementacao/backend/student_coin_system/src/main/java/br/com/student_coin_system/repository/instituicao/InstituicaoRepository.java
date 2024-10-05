package br.com.student_coin_system.repository.instituicao;

import br.com.student_coin_system.entity.instituicao.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}