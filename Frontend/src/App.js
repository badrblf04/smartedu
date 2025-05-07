import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';
import ProblemPage from './pages/ProblemPage';
import logo from './img/download.png'; // Assuming you have a logo image in the img folder
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Top Navigation Bar */}
        <header className="navbar">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="navbar-title">SMART-EDUCATION</h1>
          <ul className="nav-links">
            <li><Link to="/">Connexion \ Inscription</Link></li>
          </ul>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/problem" element={<ProblemPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 Smart Edu App. Tous droits réservés.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;