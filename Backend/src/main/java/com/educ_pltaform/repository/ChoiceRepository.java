package com.educ_pltaform.repository;

import com.educ_pltaform.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find choices by quiz or other criteria
}
