import { modal,modalListener } from "./modal.js";
import { loadHeader, logout,loadPageWrapper } from "./components/header.js";
import { cards } from "./components/cards.js";


export function loadNote(){
    const header = document.getElementById('main-wrapper');
    header.innerHTML = loadHeader()+loadPageWrapper();
    logout();
    const pageWrapper = document.getElementById('page-wrapper');
    const cardContainer = 
  `
    <div class="card-container row" >
    </div>`;
    
    pageWrapper.innerHTML   = cardContainer+modal();
    cards();
    modalListener()
    // const modals = document.getElementById('exampleModal');
    // new bootstrap.Modal(modals).show();
}
// function initializeAllMasonry() {
//     var containers = document.querySelectorAll('.card-container');
//     containers.forEach(function(container) {
//         initializeMasonry(container);
//     });
// }
