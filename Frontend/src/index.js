import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // ← Import du contexte

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider> {/* ← Encapsule App */}
            <App />
        </AuthProvider>
    </React.StrictMode>
);
