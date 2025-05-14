package com.educ_pltaform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

/**
 * Classe DTO (Data Transfer Object) pour la requête d'inscription
 * Sert à mapper les données JSON envoyées depuis le frontend
 */
public class RegisterRequest {

    @NotEmpty(message = "Le nom ne peut pas être vide.")
    private String nom;

    @NotEmpty(message = "Le prénom ne peut pas être vide.")
    private String prenom;

    @NotEmpty(message = "L'email ne peut pas être vide.")
    @Email(message = "L'email doit être valide.")
    private String email;

    @NotEmpty(message = "Le mot de passe ne peut pas être vide.")
    private String motDePasse;

    // Constructeur par défaut (nécessaire pour la désérialisation JSON)
    public RegisterRequest() {
    }

    // Constructeur avec tous les champs
    public RegisterRequest(String nom, String prenom, String email, String motDePasse) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
    }

    // Getters et setters
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
                "nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", motDePasse='[MASQUÉ]'" +
                '}';
    }
}
