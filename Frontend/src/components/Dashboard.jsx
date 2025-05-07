import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleChoice = (choice) => {
        navigate(`/${choice}`);
    };

    return (
        
        <div className="dashboard-container">
            <h1>Choisissez une action</h1>
            <div className="dashboard-buttons">
            <button onClick={() => handleChoice('quiz')}>Quiz</button>
            <button onClick={() => handleChoice('summary')}>Résumé</button>
            <button onClick={() => handleChoice('problem')}>Problème</button>
            </div>
        </div>
    );
};

export default Dashboard;