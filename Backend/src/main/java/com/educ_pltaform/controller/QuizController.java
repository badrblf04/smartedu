package com.educ_pltaform.controller;

import com.educ_pltaform.entity.Quiz;
import com.educ_pltaform.repository.QuizRepository;
import com.educ_pltaform.service.LLMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private LLMService llmService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateQuiz(@RequestBody String extractedText) {
        if (extractedText == null || extractedText.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Le texte extrait ne peut pas être vide.");
        }

        try {
            // Créer un prompt pour le LLM
            String prompt = "Génère un quiz basé sur ce texte : " + extractedText;

            // Appeler le LLM pour générer le quiz
            String generatedQuiz = llmService.generateContent(prompt);

            // Sauvegarder le problème généré
            Quiz quiz = new Quiz();
            quiz.setTitle(generatedQuiz);
            quizRepository.save(quiz);

            return ResponseEntity.ok(quiz);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la génération du quiz : " + e.getMessage());
        }
    }
}