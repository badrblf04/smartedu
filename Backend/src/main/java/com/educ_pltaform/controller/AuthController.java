package com.educ_pltaform.controller;

import com.educ_pltaform.dto.RegisterRequest;
import com.educ_pltaform.entity.User;
import com.educ_pltaform.repository.UserRepository;
import com.educ_pltaform.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User newUser = new User(request.getNom(), request.getPrenom(), request.getEmail(), request.getMotDePasse());
            return authService.registerUser(newUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'inscription de l'utilisateur : " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String motDePasse = loginData.get("motDePasse");

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            // Déboguer: ajoutez des logs pour vérifier les valeurs
            System.out.println("Email trouvé: " + email);
            System.out.println("Mot de passe fourni: " + motDePasse);
            System.out.println("Mot de passe hashé en BDD: " + user.get().getPassword());

            boolean matches = passwordEncoder.matches(motDePasse, user.get().getPassword());
            System.out.println("Résultat de la comparaison: " + matches);

            if (matches) {
                return ResponseEntity.ok("Connexion réussie !");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect !");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect !");
    }
}
