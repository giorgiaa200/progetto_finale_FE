const BASE_URL = "http://127.0.0.1:5000";

export const api = {
    // --- UTENTI ---
    async login(email, password) {
        const response = await fetch(`${BASE_URL}/api/utenti/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Credenziali errate");
        }
        
        localStorage.setItem('user_id', data.user_id);
        return data;
    },

    async registraUtente(dati) {
        const response = await fetch(`${BASE_URL}/api/utenti`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dati)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Errore durante la registrazione");
        return data;
    },

    // --- MODELLI & MOTORI ---
    async getModelli() {
        const response = await fetch(`${BASE_URL}/api/modelli`);
        if (!response.ok) throw new Error("Errore nel recupero modelli");
        return await response.json();
    },

    async getMotori(idModello) {
        const response = await fetch(`${BASE_URL}/api/motori/modello/${idModello}`);
        if (!response.ok) throw new Error("Errore nel recupero motori");
        return await response.json();
    },

    // --- PREVENTIVI (CRUD Completo) ---
    async salvaPreventivo(dati) {
        const response = await fetch(`${BASE_URL}/api/preventivi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dati)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Errore durante il salvataggio");
        return data;
    },

    async getStorico() {
        const response = await fetch(`${BASE_URL}/api/preventivi`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error("Errore recupero storico");
        return await response.json();
    },

    // Aggiunta finale per il CRUD completo (Delete)
    async deletePreventivo(id) {
        const response = await fetch(`${BASE_URL}/api/preventivi/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Errore durante l'eliminazione");
        }
        return await response.json();
    }
};