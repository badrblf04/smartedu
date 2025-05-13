package com.educ_pltaform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.educ_pltaform.entity")  // Spécifie le package contenant les entités JPA
public class EducPltaformApplication {

    public static void main(String[] args) {
        SpringApplication.run(EducPltaformApplication.class, args);
    }
}
