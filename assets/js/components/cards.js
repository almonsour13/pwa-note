import { getNoteDataById, updateStatus } from "../dataController.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const database = getDatabase();
const noteRef = ref(database, 'notes/');

export function cards() {
    onValue(noteRef, (snapshot) => {
        const notes = snapshot.val(); 
        const cardContainer = document.querySelector('.card-container');
        let cardContainerHTML = '';
        var logid = JSON.parse(localStorage.getItem('log-id')) || [];
        for (const key in notes) {
            const note = notes[key];
            if(logid === note.userID && note.status == 0){
                let itemContent = note.content.substring(0, 300);
                if (note.content.length >= 400) {
                    itemContent += '...';
                }

                cardContainerHTML += `
                    <div class="col-6 col-sm-6 col-lg-3 p-1">
                        <div id="${key}" class="card border-1 border-dark rounded-3 p-0 d-flex flex-column gap-2 cursor-pointer" style="background-color: ${note.color};">
                            ${note.images ? 
                                `<div class="card-img-container w-100 rounded-3"
                                id='img-container${key}'>
                                    
                                </div>` 
                            : ''}
                            ${note.title ? 
                                `<div class="card-header border-0 p-2 bg-transparent">
                                    <p class="card-title h5 text-truncate m-0">${note.title}</p>
                                </div>` 
                            : ''}
                            ${note.content ? 
                                `<div class="card-body p-2">
                                    <p class="card-text lh-sm m-0">${itemContent}</p>
                                </div>` 
                            : ''}
                        </div>
                    </div>`;
            }
        }
        cardContainer.innerHTML = cardContainerHTML;
        for (const key in notes) {
            const note = notes[key];
            if(logid === note.userID && note.status == 0 && note.images) {
                loadImages(note.images,key);
            }
        }
        clickCardListener();
        initializeMasonry()
    });
}   

import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

function loadImages(noteImages,key) {
    const imgContainer = document.querySelector(`#img-container${key}`);
    const storage = getStorage();
    for (let i = 0; i < noteImages.length; i++) {
        const storageReference = storageRef(storage, 'images/' + noteImages[i]);
        getDownloadURL(storageReference)
            .then((url) => {
                const img = document.createElement('img');
                img.classList = 'w-100 rounded-3'
                img.src = url;
                img.onload =() => {
initializeMasonry()
                }
                imgContainer.appendChild(img);
                initializeMasonry()
            })
            .catch((error) => {
                console.error("Error fetching image URL:", error);
            });
    }
}



function clickCardListener(){
    document.querySelectorAll('.card').forEach(element => {
        element.addEventListener('click', function() {
            const id = element.getAttribute('id');
            getNoteDataById(id)
            .then((data) => {
                if (data) {
                    const note = data;
                    const noteTitle = document.querySelector("#inputed-note-title");
                    noteTitle.value = note.title;
                    const noteText = document.querySelector("#inputed-note-text");
                    noteText.value = note.content;
                    noteText.style.height = 'auto';
                    setTimeout(function() {
                        noteText.style.height = (noteText.scrollHeight) + 'px';
                        noteText.focus();
                    }, 500);
                    

                    const pinBtn = document.querySelector('#pin-btn');
                    pinBtn.classList.contains("pinned") ? pinBtn.classList.remove("pinned") : "";

                    if (note.pin == 1) {
                        pinBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M680-840v80h-40v327l-80-80v-247H400v87l-87-87-33-33v-47h400ZM480-40l-40-40v-240H240v-80l80-80v-46L56-792l56-56 736 736-58 56-264-264h-6v240l-40 40ZM354-400h92l-44-44-2-2-46 46Zm126-193Zm-78 149Z"/></svg>`;
                    } else {
                        pinBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>`;
                    }
                    const backgroundColor = document.querySelectorAll('#background-color');
                    backgroundColor.forEach(function(element) {
                        element.classList.remove("active");
                    });
                    const modalContent = document.querySelector('#note-modal');
                    modalContent.classList.remove('bg-white');
                    modalContent.style.backgroundColor = note.color;

                    document.querySelector('#bg-color-dropdown-menu').style.backgroundColor = note.color;
                    document.querySelectorAll(".card-btn").forEach(element => {
                        element.classList.remove("d-none")
                    })
                    backgroundColor.forEach(function(element) {
                        if (element.getAttribute("color") == note.color) {
                            element.classList.add("active");
                        }
                    });

                    const modal = document.getElementById('exampleModal');
                    document.getElementById('delete-btn').addEventListener('click', function(){
                        updateStatus(id,2)
                    })
                    modal.setAttribute("noteID", id);
                    new bootstrap.Modal(modal).show();
                }
            })
            .catch((error) => {
                console.error("Error fetching note data:", error);
            });
        });
    });
}

function initializeMasonry() {
    var container = document.querySelector('.card-container');
    var msnry = new Masonry(container, {
        percentPosition: true
    });
}