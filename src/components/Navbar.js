export function Navbar() {
    const nav = document.createElement('nav');
    nav.className = 'navbar bg-base-100 shadow-sm mb-8 px-6';
    
    
    const isLogged = localStorage.getItem('user_id');

    nav.innerHTML = `
        <div class="flex-1">
            <a class="text-xl font-bold" href="#/">AutoConfig</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><a href="#/">Configuratore</a></li>
                <li><a href="#/storico">Storico</a></li>
                ${isLogged 
                    ? `<li><button id="logoutBtn" class="text-red-500">Logout</button></li>` 
                    : `<li><a href="#/login">Login</a></li>
                       <li><a href="#/register">Registrati</a></li>`
                }
            </ul>
        </div>
    `;

   
    const logoutBtn = nav.querySelector('#logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user_id');
            
            window.location.hash = '#/';
            window.location.reload(); 
        });
    }

    return nav;
}