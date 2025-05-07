import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import Result from '../components/Result';
import { uploadFile } from '../services/apiService';

const ProblemPage = () => {
    const [result, setResult] = useState(null);

    const handleFileUpload = async (file) => {
        try {
            const data = await uploadFile(file, 'problem');
            setResult(data);
        } catch (error) {
            console.error('Erreur lors de la résolution du problème :', error);
        }
    };

    return (
        <div>
            <h1>Résoudre un Problème</h1>
            <FileUploader onUpload={handleFileUpload} />
            {result && <Result data={result} />}
        </div>
    );
};

export default ProblemPage;