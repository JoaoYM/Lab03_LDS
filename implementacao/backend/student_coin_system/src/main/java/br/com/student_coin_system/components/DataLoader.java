package br.com.student_coin_system.components;


import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // criarVantagens();
        // criarProfessores();
        // criarAlunos();
        // criarEmpresas();
    }
}
