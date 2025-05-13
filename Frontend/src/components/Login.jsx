import React, { useState } from 'react';

const Login = () => {
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
                body: JSON.stringify(form) // envoie { email, motDePasse }
            });

            const message = await response.text();

            if (!response.ok) throw new Error(message);

            setSuccess(message); // Connexion réussie
            setForm({ email: '', motDePasse: '' });

        } catch (err) {
            setError(err.message || "Erreur de connexion.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-center">Connexion</h2>

            {success && <div className="text-green-600 mb-4">{success}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="motDePasse" className="block mb-1 text-sm">Mot de passe</label>
                    <input
                        type="password"
                        name="motDePasse"
                        id="motDePasse"
                        value={form.motDePasse}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;
