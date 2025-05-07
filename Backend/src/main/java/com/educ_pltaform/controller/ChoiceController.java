package com.educ_pltaform.controller;

import com.educ_pltaform.entity.Choice;
import com.educ_pltaform.repository.ChoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/choices")
@CrossOrigin(origins = "http://localhost:3000")
public class ChoiceController {

    @Autowired
    private ChoiceRepository choiceRepository;

    @GetMapping
    public List<Choice> getAllChoices() {
        return choiceRepository.findAll();
    }

    @PostMapping
    public Choice createChoice(@RequestBody Choice choice) {
        return choiceRepository.save(choice);
    }
}