import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import Result from '../components/Result';
import { uploadFile } from '../services/apiService';

const SummaryPage = () => {
    const [result, setResult] = useState(null);

    const handleFileUpload = async (file) => {
        try {
            const data = await uploadFile(file, 'summary');
            setResult(data);
        } catch (error) {
            console.error('Erreur lors de la génération du résumé :', error);
        }
    };

    return (
        <div>
            <h1>Générer un Résumé</h1>
            <FileUploader onUpload={handleFileUpload} />
            {result && <Result data={result} />}
        </div>
    );
};

export default SummaryPage;