package com.valeviver.config;

import com.valeviver.components.SecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return  httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/proprietario").hasRole("ADMIN")
                        
                        // Rotinas de gerenciamento entidades 'Especialidades' | 'Exames' | 'Funcionários'
                        .requestMatchers("/especialidades/**").hasAnyRole("ADMIN", "SECRETARY")
                        .requestMatchers("/exames/**").hasAnyRole("ADMIN", "SECRETARY")
                        .requestMatchers("/funcionarios/**").hasRole("ADMIN")
                        
                        // Rotinas de gerenciamento entidades  'Médicos'
                        .requestMatchers("/medicos/**").hasAnyRole("ADMIN", "SECRETARY")
                        
                        //  Rotinas de gerenciamento entidades  'Pacientes'
                        .requestMatchers("/pacientes/**").hasAnyRole("ADMIN", "SECRETARY")
                        
                        //  Rotinas de gerenciamento entidades 'Agendamentos'
                        .requestMatchers(HttpMethod.GET, "/exames-agendados/**").hasAnyRole("ADMIN", "SECRETARY", "MEDIC")
                        .requestMatchers("/exames-agendados/**").hasAnyRole("ADMIN", "SECRETARY")
                        .requestMatchers(HttpMethod.GET, "/consultas-agendadas/**").hasAnyRole("ADMIN", "SECRETARY", "MEDIC")
                        .requestMatchers("/consultas-agendadas/**").hasAnyRole("ADMIN", "SECRETARY")
                        
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}