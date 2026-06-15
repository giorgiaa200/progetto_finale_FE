import "./style.css";
import { Navbar } from "./components/Navbar";
import { ConfiguratorPage } from "./pages/ConfiguratorPage";
import { EngineSelectionPage } from "./pages/EngineSelectionPage";
import { HistoryPage } from "./pages/HistoryPage";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

const app = document.getElementById("app");

async function render() {
    app.innerHTML = "";
    
    
    app.appendChild(Navbar());

    const hash = window.location.hash;

    try {
        // ROTTE UTENTI
        if (hash === '#/login') {
            app.appendChild(LoginPage());
        } 
        else if (hash === '#/register') {
            app.appendChild(RegisterPage());
        }
        // ROTTE CONFIGURATORE
        else if (hash.startsWith('#/motori/')) {
            const idModello = hash.split('/')[2];
            app.appendChild(await EngineSelectionPage(idModello));
        } 
        else if (hash === '#/storico') {
            app.appendChild(await HistoryPage());
        } 
        // DEFAULT (HOME)
        else {
            app.appendChild(await ConfiguratorPage());
        }
    } catch (error) {
        console.error("Errore durante il rendering:", error);
        app.innerHTML = `<div class="p-10 text-red-500">Errore nel caricamento della pagina.</div>`;
    }
}

window.addEventListener("hashchange", render);
render();