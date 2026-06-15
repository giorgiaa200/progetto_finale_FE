import { api } from "../services/api";

export function LoginPage() {
    const container = document.createElement('div');
    container.className = "p-6 max-w-sm mx-auto";
    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <input type="email" id="email" placeholder="Email" class="w-full p-2 mb-2 border rounded">
        <input type="password" id="password" placeholder="Password" class="w-full p-2 mb-4 border rounded">
        <button id="loginBtn" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Accedi</button>
    `;

    container.querySelector('#loginBtn').onclick = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert("Compila tutti i campi!");
            return;
        }

        try {
            const data = await api.login(email, password);
            
            // 1. Salvataggio ID
            localStorage.setItem('user_id', data.user_id);
            
            alert("Login effettuato con successo!");
            
            
            window.location.hash = '#/';
            window.location.reload(); 
            
        } catch (e) {
            console.error(e);
            alert("Credenziali errate o errore di connessione.");
        }
    };
    return container;
}