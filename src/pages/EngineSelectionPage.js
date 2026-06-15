import { api } from "../services/api";

export async function EngineSelectionPage(idModello) {
    const container = document.createElement('div');
    container.className = "p-6";
    container.innerHTML = `<h1 class="text-2xl font-bold mb-4">Seleziona Motore</h1>`;

    try {
        const motori = await api.getMotori(idModello);
        
        if (!Array.isArray(motori)) {
            throw new Error("Formato dati non valido dal server.");
        }

        const list = document.createElement('div');
        list.className = "grid grid-cols-1 md:grid-cols-3 gap-4";

        motori.forEach(m => {
            const btn = document.createElement('button');
            btn.className = "p-4 border rounded shadow hover:bg-gray-100 transition";
            btn.innerHTML = `
                <h2 class="font-bold">${m.nome || "Motore"}</h2>
                <p>Prezzo: ${m.prezzo} €</p>
            `;
            
            btn.onclick = async () => {
                const userId = localStorage.getItem('user_id');
                
                if (!userId) {
                    alert("Devi aver effettuato il login per salvare un preventivo!");
                    window.location.hash = '#/login';
                    return;
                }

                
                const idMotore = m.id || m.id_motore || m.motore_id;

                
                const payload = {
                    id_utente: Number(userId), 
                    id_modello: Number(idModello),
                    id_motore: Number(idMotore),
                    prezzo_totale: parseFloat(m.prezzo)
                };

                try {
                    
                    await api.salvaPreventivo(payload);
                    alert("Preventivo salvato con successo!");
                    window.location.hash = '#/storico';
                } catch (err) {
                    
                    console.error("Dettaglio errore:", err);
                    alert("Errore nel salvataggio: " + err.message);
                }
            };
            list.appendChild(btn);
        });

        container.appendChild(list);
    } catch (e) {
        container.innerHTML = `<p class="text-red-500">Errore: ${e.message}</p>`;
    }

    return container;

    
}