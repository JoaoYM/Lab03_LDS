package br.com.student_coin_system.controller.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.student_coin_system.dto.authentication.AuthenticationDTO;
import br.com.student_coin_system.dto.authentication.LoginResponseDTO;
import br.com.student_coin_system.dto.authentication.RegisterDTO;
import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.repository.users.UserRepository;
import br.com.student_coin_system.service.authentication.TokenService;
import br.com.student_coin_system.service.users.UsersService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {
    private final UsersService userService;

    public AuthenticationController(UsersService userService) {
        this.userService = userService;
    }

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository repository;
    @Autowired
    private TokenService tokenService;


    @CrossOrigin(origins = "http://localhost:3000")
    @SuppressWarnings("rawtypes")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @SuppressWarnings("rawtypes")
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.repository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, data.role());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }


    @PutMapping("/{id}") 
    public User updateUsuario(@RequestBody @Valid User data) {
        return userService.update(data.getId(), data);
    }

    @DeleteMapping("/{id}") 
    public void deleteUsuario(@PathVariable String id) {
        userService.delete(id);
    }

    @GetMapping 
    public Iterable<User> getUsuarios() {
        return userService.findAll();
    }
}