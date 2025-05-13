import React, { useState } from 'react';

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
        <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Créer un compte</h2>

            {success ? (
                <div className="bg-green-100 p-4 mb-6 rounded-md text-green-700">
                    <p className="font-medium">Inscription réussie !</p>
                    <p>Vous pouvez maintenant vous connecter avec vos identifiants.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {apiError && (
                        <div className="bg-red-100 p-3 rounded text-red-700 text-sm mb-4">
                            {apiError}
                        </div>
                    )}

                    <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={form.nom}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                    </div>

                    <div>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={form.prenom}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="motDePasse"
                            name="motDePasse"
                            value={form.motDePasse}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.motDePasse ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.motDePasse && <p className="mt-1 text-sm text-red-600">{errors.motDePasse}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Inscription en cours...' : "S'inscrire"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Register;
