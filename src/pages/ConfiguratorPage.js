import { api } from "../services/api";

export async function ConfiguratorPage() {
    const wrapper = document.createElement('div');
    wrapper.className = 'container mx-auto p-6';

    const title = document.createElement('h1');
    title.className = 'text-3xl font-bold mb-6';
    title.textContent = 'Scegli il tuo modello';
    wrapper.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-3 gap-6';
    wrapper.appendChild(grid);

    const modelli = await api.getModelli();

    modelli.forEach(m => {
        
        const card = document.createElement('div');
        card.className = 'card bg-white shadow-xl p-6 border text-base-200';
        card.innerHTML = `
            <h2 class="text-xl font-bold">${m.nome}</h2>
            <p>Base: ${m.prezzo} €</p>
        `;
        
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary mt-4';
        btn.textContent = 'Seleziona';
        btn.onclick = () => {
            localStorage.setItem('config_modello_id', m.id_modello);
            localStorage.setItem('config_prezzo_base', m.prezzo);
            window.location.hash = `/motori/${m.id_modello}`;
        };
        
        card.appendChild(btn);
        grid.appendChild(card);
    });

    return wrapper;
}