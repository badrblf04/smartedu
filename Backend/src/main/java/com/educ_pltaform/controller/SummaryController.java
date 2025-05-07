package com.educ_pltaform.controller;

import com.educ_pltaform.entity.Summary;
import com.educ_pltaform.repository.SummaryRepository;
import com.educ_pltaform.service.LLMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summaries")
@CrossOrigin(origins = "http://localhost:3000")
public class SummaryController {

    @Autowired
    private SummaryRepository summaryRepository;

    @Autowired
    private LLMService llmService;

    @PostMapping("/generate")
    public Summary generateSummary(@RequestBody String extractedText, @RequestParam(defaultValue = "deepseek-chat") String model) {
        // Créer un prompt pour le LLM
        String prompt = "Génère un résumé basé sur ce texte : " + extractedText;

        // Appeler le LLM pour générer le résumé
        String generatedSummary = llmService.generateContent(prompt);

        // Sauvegarder le résumé généré
        Summary summary = new Summary();
        summary.setContent(generatedSummary);
        summaryRepository.save(summary);

        return summary;
    }
}