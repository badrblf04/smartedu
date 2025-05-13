import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
    // État pour l'animation des cartes
    const [activeCard, setActiveCard] = React.useState(null);
    const navigate = useNavigate();

    // Vérification de l'authentification
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        // Vérification de l'état de connexion
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            setIsAuthenticated(true);
        }
    }, []);

    // Données pour les cartes
    const cards = [
        {
            id: 'quiz',
            title: 'Quiz Interactifs',
            description: 'Testez vos connaissances avec nos quiz personnalisés',
            icon: '📝',
            color: '#4CAF50'
        },
        {
            id: 'problem',
            title: 'Résolution de Problèmes',
            description: 'Améliorez votre logique avec des problèmes pratiques',
            icon: '🧩',
            color: '#2196F3'
        },
        {
            id: 'solution',
            title: 'Solutions Guidées',
            description: 'Apprenez avec des solutions étape par étape',
            icon: '💡',
            color: '#FF9800'
        }
    ];

    // Fonction pour gérer le clic sur les cartes
    const handleCardClick = (path) => {
        if (isAuthenticated) {
            navigate('/' + path);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Apprenez à votre rythme</h1>
            <p className="dashboard-subtitle">Sélectionnez une activité pour commencer votre parcours d'apprentissage</p>

            <div className="cards-container">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`dashboard-card ${activeCard === card.id ? 'active' : ''}`}
                        style={{
                            borderTop: `4px solid ${card.color}`,
                            boxShadow: activeCard === card.id ? `0 8px 16px rgba(0,0,0,0.2), 0 0 0 2px ${card.color}` : '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => handleCardClick(card.id)}
                        onMouseEnter={() => setActiveCard(card.id)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        <div className="card-icon" style={{backgroundColor: card.color}}>
                            <span>{card.icon}</span>
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <div className="card-footer">
                            <button className="card-button" style={{backgroundColor: card.color}}>
                                Commencer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!isAuthenticated && (
                <div className="auth-prompt">
                    <p>Connectez-vous pour sauvegarder votre progression</p>
                    <div className="auth-buttons">
                        <button className="auth-button login" onClick={() => navigate('/login')}>Connexion</button>
                        <button className="auth-button register" onClick={() => navigate('/register')}>Inscription</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;