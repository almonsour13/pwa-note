import { modal,autoResizeTextarea, bgColorListener, pinBtnListener,saveNote,addBtnNote } from "./modal.js";
import { getDatabase, ref, push,get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
    autoResizeTextarea();
    pinBtnListener()
    bgColorListener()
    saveNote()
    addBtnNote()
}
// function initializeAllMasonry() {
//     var containers = document.querySelectorAll('.card-container');
//     containers.forEach(function(container) {
//         initializeMasonry(container);
//     });
// }
