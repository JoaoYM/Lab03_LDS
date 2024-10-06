package br.com.student_coin_system.dto.authentication;

import br.com.student_coin_system.enums.UserRoles;

public record RegisterDTO(String login, String password, UserRoles role) { }
