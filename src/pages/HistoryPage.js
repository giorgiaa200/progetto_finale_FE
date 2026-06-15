import { api } from "../services/api";

export async function HistoryPage() {
    const container = document.createElement('div');
    container.className = "p-6";
    
    // Titolo e struttura tabella 
    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-6">Storico Preventivi</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 shadow-md rounded">
                <thead>
                    <tr class="bg-gray-100 border-b text-gray-700">
                        <th class="p-3 text-left">Modello</th>
                        <th class="p-3 text-left">Motore</th>
                        <th class="p-3 text-left">Prezzo Totale</th>
                        <th class="p-3 text-left">Azioni</th>
                    </tr>
                </thead>
                <tbody id="history-table-body" class="text-gray-500">
                </tbody>
            </table>
        </div>
    `;

    try {
        const preventivi = await api.getStorico();
        const tbody = container.querySelector('#history-table-body');

        if (!preventivi || preventivi.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center">Nessun preventivo trovato.</td></tr>`;
        } else {
            preventivi.forEach(p => {
                const row = document.createElement('tr');
                row.className = "border-b hover:bg-gray-50";
                
                // Inserimento dati
                row.innerHTML = `
                    <td class="p-3 text-black">${p.nome_modello || 'Modello ID: ' + p.id_modello}</td>
                    <td class="p-3">${p.nome_motore || 'Motore ID: ' + p.id_motore}</td>
                    <td class="p-3 font-semibold text-blue-600">${p.prezzo_totale} €</td>
                `;

                // Creazione cella e bottone Elimina
                const tdAzioni = document.createElement('td');
                tdAzioni.className = "p-3";
                
                const btnElimina = document.createElement('button');
                btnElimina.innerText = "Elimina";
                btnElimina.className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm shadow-sm";

                // Logica eliminazione
                btnElimina.onclick = async () => {
                    if (confirm(`Sei sicuro di voler eliminare il preventivo di ${p.nome_modello}?`)) {
                        try {
                            await api.deletePreventivo(p.id_preventivo);
                            row.remove(); // Rimuove la riga dalla tabella senza ricaricare
                            alert("Preventivo eliminato con successo.");
                        } catch (err) {
                            alert("Errore durante l'eliminazione: " + err.message);
                        }
                    }
                };

                tdAzioni.appendChild(btnElimina);
                row.appendChild(tdAzioni);
                tbody.appendChild(row);
            });
        }
    } catch (e) {
        console.error("Errore caricamento storico:", e);
        container.innerHTML = `
            <div class="p-4 text-red-600 bg-red-100 rounded">
                Errore nel caricamento dello storico: ${e.message}
            </div>
        `;
    }

    return container;
}