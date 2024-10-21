package br.com.student_coin_system.service.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.repository.users.UserRepository;

import java.util.List;

@Service
public class UsersService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        // Encriptar a senha antes de salvar
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return userRepository.save(user);
    }

    public User update(String id, User usuario) {
        if (userRepository.existsById(id)) {
            return userRepository.save(usuario);
        }
        return null;
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }
}
