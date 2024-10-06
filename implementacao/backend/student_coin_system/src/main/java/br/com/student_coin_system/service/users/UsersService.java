package br.com.student_coin_system.service.users;

import org.springframework.stereotype.Service;

import br.com.student_coin_system.entity.authentication.User;
import br.com.student_coin_system.repository.users.UserRepository;

import java.util.List;

@Service
public class UsersService {
    private final UserRepository userRepository;

    public UsersService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User update(String id, User usuario) {
        if(userRepository.existsById(id)){
           return userRepository.save(usuario);
        }

        return null;
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }
}