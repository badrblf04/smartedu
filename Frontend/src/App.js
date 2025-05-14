import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';
import ProblemPage from './pages/ProblemPage';
import Dashboard from './components/Dashboard';
import logo from './img/download.png';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Vérification de l'authentification lors du chargement de l'app
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName');

    if (token) {
      setIsAuthenticated(true);
      setUserName(name || 'Utilisateur');
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
      <Router>
        <div className="app-layout">
          {/* Top Navigation Bar - Modernisé */}
          <header className="navbar">
            <div className="navbar-brand">
              <img src={logo} alt="Logo" className="logo pulse-animation" />
              <h1 className="navbar-title">SMART-EDUCATION</h1>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <nav className={`nav-container ${menuOpen ? 'active' : ''}`}>
              <ul className="nav-links">
                <li><Link to="/" className="nav-link">Accueil</Link></li>
                <li><Link to="/quiz" className="nav-link">Quiz</Link></li>
                <li><Link to="/problem" className="nav-link">Problèmes</Link></li>

                {isAuthenticated ? (
                    <>
                      <li className="welcome-message">Bienvenue, {userName}</li>
                      <li>
                        <button onClick={handleLogout} className="nav-link highlight secondary">
                          Déconnexion
                        </button>
                      </li>
                    </>
                ) : (
                    <>
                      <li><Link to="/login" className="nav-link highlight">Connexion</Link></li>
                      <li><Link to="/register" className="nav-link highlight secondary">Inscription</Link></li>
                    </>
                )}
              </ul>
            </nav>
          </header>

          {/* Main Content avec transition */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/problem" element={<ProblemPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Redirection si déjà connecté */}
              <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            </Routes>
          </main>

          {/* Footer modernisé */}
          <footer className="footer">
            <div className="footer-content">
              <p>&copy; 2025 Smart Edu App. Tous droits réservés.</p>
              <div className="footer-links">
                <Link to="/about">À propos</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/privacy">Confidentialité</Link>
              </div>
            </div>
          </footer>
        </div>
      </Router>
  );
}

export default App;