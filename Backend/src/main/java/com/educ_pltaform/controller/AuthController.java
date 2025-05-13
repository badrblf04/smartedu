package com.educ_pltaform.controller;

import com.educ_pltaform.dto.RegisterRequest;
import com.educ_pltaform.entity.User;
import com.educ_pltaform.repository.UserRepository;
import com.educ_pltaform.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Inscription
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            // Create the User object from the request
            User newUser = new User(request.getNom(), request.getPrenom(), request.getEmail(), request.getMotDePasse());

            // Call the service method to register the user and return a ResponseEntity
            return authService.registerUser(newUser);

        } catch (Exception e) {
            // If something goes wrong, return a ResponseEntity with a 500 status code
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'inscription de l'utilisateur");
        }
    }

    // Connexion
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String motDePasse = loginData.get("motDePasse");

        // Use UserRepository to call findByEmail
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(motDePasse, user.get().getPassword())) {
            return ResponseEntity.ok("Connexion réussie !");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect !");
    }
}
