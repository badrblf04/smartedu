package com.educ_pltaform.service;

import com.educ_pltaform.entity.User;
import com.educ_pltaform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<String> registerUser(User user) {
        try {
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("L'email est déjà utilisé.");
            }

            String motDePasseHache = passwordEncoder.encode(user.getPassword());
            user.setPassword(motDePasseHache);
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body("Utilisateur enregistré avec succès !");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'enregistrement de l'utilisateur : " + e.getMessage());
        }
    }
    }