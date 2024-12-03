package br.com.student_coin_system.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import br.com.student_coin_system.components.SecurityFilterToken;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    
    @Autowired
    SecurityFilterToken securityFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.applyPermitDefaultValues();
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .exceptionHandling(customizer -> customizer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/aluno/**").hasAnyRole("PROFESSOR", "ALUNO", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/aluno/**").hasAnyRole("PROFESSOR", "ALUNO", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/professor/**").hasAnyRole("PROFESSOR", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/empresa/**").hasAnyRole("EMPRESA", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/instituicao/**").hasAnyRole("EMPRESA", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/vantagem").hasAnyRole("EMPRESA", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/vantagem/**").hasAnyRole("EMPRESA", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/vantagem/**").hasAnyRole("EMPRESA", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/vantagem/**").hasAnyRole("EMPRESA", "ADMIN", "ALUNO")
                .requestMatchers(HttpMethod.POST, "/api/conta-corrente/transferirMoedas").hasAnyRole("PROFESSOR", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/conta-corrente/resgatar-vantagem").hasAnyRole("ALUNO", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/conta-corrente/resgatar-vantagem/**").hasAnyRole("ALUNO", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/conta-corrente/**").hasAnyRole("ALUNO", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/conta-corrente/**").hasAnyRole("ALUNO", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/historico-conta").hasAnyRole("ALUNO", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/historico-conta/**").hasAnyRole("PROFESSOR", "ADMIN", "ALUNO", "EMPRESA")
                .requestMatchers("/**").hasRole("ADMIN"))
                
        ;
        return http.addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class).build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}