import { api } from "../services/api";

export function RegisterPage() {
    const container = document.createElement('div');
    container.className = "p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg";
    
    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-900">Registrati ad AutoConfig</h1>
        
        <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-gray-800">Nome</label>
            <input type="text" id="username" placeholder="Inserisci il tuo nome" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-gray-900" required>
        </div>
        
        <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-gray-800">Email</label>
            <input type="email" id="email" placeholder="nome@esempio.it" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-gray-900" required>
        </div>
        
        <div class="mb-6">
            <label class="block text-sm font-medium mb-1 text-gray-800">Password</label>
            <input type="password" id="password" placeholder="Minimo 6 caratteri" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-gray-900" required>
        </div>
        
        <button id="regBtn" class="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 font-bold transition-colors">
            Registrati
        </button>
        
        <p class="mt-4 text-center text-sm text-gray-600">
            Hai già un account? <a href="#/login" class="text-blue-600 hover:underline font-medium">Accedi qui</a>
        </p>
    `;

    container.querySelector('#regBtn').onclick = async () => {
        const dati = {
            nome: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        if (!dati.nome || !dati.email || !dati.password) {
            alert("Per favore, compila tutti i campi!");
            return;
        }

        try {
            await api.registraUtente(dati);
            alert("Registrazione completata con successo!");
            window.location.hash = '#/login';
        } catch (e) {
            alert("Errore: " + e.message);
        }
    };

    return container;
}