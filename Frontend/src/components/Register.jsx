import React, { useState } from 'react';
import './Register.css'; // Assurez-vous d'importer le CSS

const Register = () => {
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        motDePasse: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState("");

    // Validation du formulaire
    const validateForm = () => {
        const newErrors = {};
        if (!form.nom.trim()) newErrors.nom = "Le nom est requis";
        if (!form.prenom.trim()) newErrors.prenom = "Le prénom est requis";
        if (!form.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "L'email n'est pas valide";
        }
        if (!form.motDePasse.trim()) {
            newErrors.motDePasse = "Le mot de passe est requis";
        } else if (form.motDePasse.length < 8) {
            newErrors.motDePasse = "Le mot de passe doit contenir au moins 8 caractères";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");

        if (!validateForm()) return;

        setLoading(true);
        console.log("Form data:", form);

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await response.text();

            if (!response.ok) {
                throw new Error(data || "Une erreur est survenue");
            }

            setSuccess(true);
            setForm({ nom: "", prenom: "", email: "", motDePasse: "" });
        } catch (error) {
            setApiError(error.message || "Une erreur de connexion est survenue");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    return (
        <div className="register-container">
            <h2>Créer un compte</h2>
            <p>Veuillez remplir le formulaire ci-dessous pour vous inscrire.</p>

            {success ? (
                <div className="success-message">
                    <p>Inscription réussie !</p>
                    <p>Vous pouvez maintenant vous connecter avec vos identifiants.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {apiError && <div className="error-message">{apiError}</div>}

                    <div className="field">
                        <label htmlFor="nom">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={form.nom}
                            onChange={handleChange}
                        />
                        {errors.nom && <p className="error-text">{errors.nom}</p>}
                    </div>

                    <div className="field">
                        <label htmlFor="prenom">Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={form.prenom}
                            onChange={handleChange}
                        />
                        {errors.prenom && <p className="error-text">{errors.prenom}</p>}
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="field">
                        <label htmlFor="motDePasse">Mot de passe</label>
                        <input
                            type="password"
                            id="motDePasse"
                            name="motDePasse"
                            value={form.motDePasse}
                            onChange={handleChange}
                        />
                        {errors.motDePasse && <p className="error-text">{errors.motDePasse}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Inscription en cours..." : "S'inscrire"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Register;
