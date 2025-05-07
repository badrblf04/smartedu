package com.educ_pltaform.controller;

import com.educ_pltaform.entity.UploadedFile;
import com.educ_pltaform.repository.UploadedFileRepository;
import com.educ_pltaform.service.FileExtractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/uploaded-files")
@CrossOrigin(origins = "http://localhost:3000")
public class UploadedFileController {

    @Autowired
    private UploadedFileRepository uploadedFileRepository;

    @Autowired
    private FileExtractionService fileExtractionService;

    // Récupérer tous les fichiers uploadés
    @GetMapping
    public ResponseEntity<List<UploadedFile>> getAllUploadedFiles() {
        List<UploadedFile> files = uploadedFileRepository.findAll();
        return ResponseEntity.ok(files);
    }

    // Endpoint pour uploader un fichier
    @PostMapping("/upload")
    public ResponseEntity<UploadedFile> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Sauvegarder le fichier dans le répertoire fileuploaded
            saveFileToDirectory(file, "src/main/resources/fileuploaded");

            // Créer une entité UploadedFile
            UploadedFile uploadedFile = new UploadedFile();
            uploadedFile.setName(file.getOriginalFilename());
            uploadedFile.setType(file.getContentType());
            uploadedFile.setContent(file.getBytes());

            // Sauvegarder dans la base de données
            UploadedFile savedFile = uploadedFileRepository.save(uploadedFile);
            return ResponseEntity.ok(savedFile);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Endpoint pour uploader un fichier et extraire son contenu
    @PostMapping("/extract")
    public ResponseEntity<String> uploadAndExtractFile(@RequestParam("file") MultipartFile file) {
        try {
            // Sauvegarder le fichier dans le répertoire fileuploaded
            saveFileToDirectory(file, "src/main/resources/fileuploaded");

            // Créer et sauvegarder l'entité UploadedFile
            UploadedFile uploadedFile = new UploadedFile();
            uploadedFile.setName(file.getOriginalFilename());
            uploadedFile.setType(file.getContentType());
            uploadedFile.setContent(file.getBytes());
            UploadedFile savedFile = uploadedFileRepository.save(uploadedFile);

            // Envoyer le fichier au service Python pour extraction
            String extractedText = fileExtractionService.sendFileToPythonService(savedFile);

            // Sauvegarder le texte extrait dans le répertoire fileextracted
            saveExtractedTextToFile(savedFile.getName(), extractedText);

            return ResponseEntity.ok("Texte extrait et sauvegardé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'extraction : " + e.getMessage());
        }
    }

    // Méthode pour sauvegarder un fichier dans un répertoire
    private void saveFileToDirectory(MultipartFile file, String directoryPath) throws IOException {
        Path directory = Paths.get(directoryPath);
        if (!Files.exists(directory)) {
            Files.createDirectories(directory); // Créer le répertoire s'il n'existe pas
        }

        Path filePath = directory.resolve(file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
    }

    // Méthode pour sauvegarder le texte extrait dans un fichier
    private void saveExtractedTextToFile(String originalFileName, String extractedText) throws IOException {
        Path directoryPath = Paths.get("src/main/resources/fileextracted");
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath); // Créer le répertoire s'il n'existe pas
        }

        String fileName = originalFileName.replaceAll("\\s+", "_") + "_extracted.txt";
        Path filePath = directoryPath.resolve(fileName);

        Files.write(filePath, extractedText.getBytes());
    }
}