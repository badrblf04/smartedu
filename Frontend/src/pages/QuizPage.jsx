import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import Result from '../components/Result';
import { uploadFile } from '../services/apiService';

const QuizPage = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = async (file) => {
        // Validation du fichier
        if (!file) {
            setError("Veuillez sélectionner un fichier valide.");
            return;
        }

        // Vérification du type MIME (optionnel)
        const validMimeTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validMimeTypes.includes(file.type)) {
            setError("Type de fichier non supporté. Veuillez sélectionner un fichier PDF, TXT ou DOCX.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await uploadFile(file, 'quizes/generate');
            setResult(data);
        } catch (error) {
            setError(error.response?.data?.message || "Échec de la génération du quiz. Veuillez réessayer.");
            console.error('Erreur backend:', error.response?.data || error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="quiz-page">
            <h1>Générer un Quiz</h1>
            
            <FileUploader 
                onUpload={handleFileUpload} 
                disabled={isLoading} 
                accept=".pdf,.txt,.docx" 
            />
            
            {isLoading && <p className="loading-message">Génération du quiz en cours...</p>}
            {error && <p className="error-message">{error}</p>}
            {result && <Result data={result} />}
        </div>
    );
};

export default QuizPage;