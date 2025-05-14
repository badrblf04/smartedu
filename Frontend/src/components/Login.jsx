import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 👈 Import du CSS personnalisé

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        motDePasse: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const message = await response.text();
                data = { message };
            }

            if (!response.ok) throw new Error(data.message || "Erreur de connexion");

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.userName || data.nom || form.email.split('@')[0]);

            setSuccess("Connexion réussie !");
            setForm({ email: '', motDePasse: '' });

            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (err) {
            setError(err.message || "Erreur de connexion.");
        }
    };

    return (
        <div className="login-container">
            <h2>Bienvenue</h2>
            <p>Connectez-vous à votre compte</p>

            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="motDePasse"
                    placeholder="Mot de passe"
                    value={form.motDePasse}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
