package com.educ_pltaform.service;

import com.educ_pltaform.entity.UploadedFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileExtractionService {

    @Value("${python.microservice.url}")
    private String pythonMicroserviceUrl;

    private final RestTemplate restTemplate;

    public FileExtractionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String sendFileToPythonService(UploadedFile uploadedFile) {
        try {
            // Préparer les données pour la requête POST
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new ByteArrayResource(uploadedFile.getContent()) {
                @Override
                public String getFilename() {
                    return uploadedFile.getName();
                }
            });

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Envoyer la requête POST
            ResponseEntity<String> response = restTemplate.postForEntity(pythonMicroserviceUrl, requestEntity, String.class);

            // Retourner la réponse
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'envoi du fichier au service Python", e);
        }
    }

    public void testSendLocalFileToPythonService(String filePath) {
        try {
            // Lire le fichier local
            Path path = Path.of(filePath);
            byte[] content = Files.readAllBytes(path);
            String fileName = path.getFileName().toString();

            // Créer un objet UploadedFile
            UploadedFile file = new UploadedFile();
            file.setName(fileName);
            file.setContent(content);

            // Envoyer le fichier au microservice Python
            String response = sendFileToPythonService(file);
            System.out.println("Réponse du microservice Python : " + response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}