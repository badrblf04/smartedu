package com.educ_pltaform.controller;

import com.educ_pltaform.entity.Probleme;
import com.educ_pltaform.repository.ProblemeRepository;
import com.educ_pltaform.service.LLMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = "http://localhost:3000")
public class ProblemeController {

    @Autowired
    private ProblemeRepository problemeRepository;

    @Autowired
    private LLMService llmService;

    @PostMapping("/generate")
    public Probleme generateProblem(@RequestBody String extractedText, @RequestParam(defaultValue = "deepseek-chat") String model) {
        // Créer un prompt pour le LLM
        String prompt = "Génère un problème basé sur ce texte : " + extractedText;

        // Appeler le LLM pour générer le problème
        String generatedDescription = llmService.generateContent(prompt);

        // Sauvegarder le problème généré
        Probleme probleme = new Probleme();
        probleme.setDescription(generatedDescription);
        problemeRepository.save(probleme);

        return probleme;
    }
}