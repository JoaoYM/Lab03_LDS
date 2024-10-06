package br.com.student_coin_system.entity.authentication;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.student_coin_system.enums.UserRoles;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Table(name = "users")
@Entity(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String login;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRoles role;

    public User(String login, String password, UserRoles role){
        this.login = login;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Adapt to use UserRoles enum
        List<GrantedAuthority> authorities = Stream.of(role)
                .map(UserRoles -> new SimpleGrantedAuthority("ROLE_" + UserRoles.getRole().toUpperCase()))
                .collect(Collectors.toList());

        if (this.role == UserRoles.ADMIN) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        
        return authorities;
    }

    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    //     // Usar UserRoles enum para gerar a lista de autoridades
    //     List<GrantedAuthority> authorities = Stream.of(role)
    //             .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole().toUpperCase()))
    //             .distinct() // Para evitar duplicatas
    //             .collect(Collectors.toList());

    //     // Se o usuário for ADMIN, adicionar a autoridade ROLE_USER
    //     if (this.role == UserRoles.ADMIN) {
    //         authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    //     }

    //     return authorities;
    // }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}