import { getNoteDataById,updateData,pushData,uploadImage } from "./dataController.js";
export function modalListener(){
  autoResizeTextarea();
  pinBtnListener()
  bgColorListener()
  saveNote()
  addBtnNote()
  fileInput()
}
function saveNote(){
  document.getElementById('add-note').addEventListener('click', function() {
    const modal = document.getElementById('exampleModal');
    const noteTitle = document.querySelector("#inputed-note-title");
    const noteText = document.querySelector("#inputed-note-text");
    const pin = document.querySelector('#pin-btn');
    const modalContent = document.querySelector('.modal-content');
    var bgColor = '';
    
    document.querySelectorAll('#background-color').forEach(function(element) {
        if (element.classList.contains('active')) {
            bgColor = element.getAttribute('color');
        }
    });
    var pinValue = 0;
    if(pin.classList.contains("pinned")){
      pinValue = 1
    }
    var imgWrappers = document.querySelectorAll('.img-wrapper');
    var imagesPromiseArray = [];
    if (imgWrappers.length !== 0) {
    //  imgWrappers.forEach(function(element) {
          imagesPromiseArray.push(uploadImage());
    //  });
    }
    var logid = JSON.parse(localStorage.getItem('log-id')) || [];
    const noteArray = {
        userID: logid,
        title: noteTitle.value,
        content: noteText.value,
        dateCreated: new Date().toISOString(), // Set the creation date
        color: bgColor,
        backgroundImage: '',
        status: 0,
        reminder: '',
        pin: pinValue
    };
    const noteID = modal.getAttribute('noteID');
    if(noteID != null){//update
      if(imgWrappers.length !== 0){//has image
        addImageInArray(imagesPromiseArray,noteArray,noteID)
      }else{
        noteArray.images = [];
        update(noteID,noteArray)
      }
    }else{//push
      if(imgWrappers.length !== 0){//has image
        addImageInArray(imagesPromiseArray,noteArray,noteID)
      }else{
        push(noteArray,imgWrappers.length)
      }
    }
    noteTitle.value = "";
    noteText.value = "";
    setTimeout(function() {
      modalContent.style.backgroundColor = '';
    }, 500);
    var imgContainer = document.querySelector('.img-container')
    imgContainer.innerHTML = '';
    imgContainer.classList.remove("d-block")
    imgContainer.classList.add("d-done")
    modal.removeAttribute("noteID");
  });
}
function addImageInArray(imagesPromiseArray,noteArray,noteID){
  console.log(noteID)
  Promise.all(imagesPromiseArray)
    .then(function(imagesArrays) {
        var images = imagesArrays.flat();
        noteArray.images = images;
        if(noteID != null){
          update(noteID,noteArray)
        }else{
          push(noteArray,images.length)
        }
    })
    .catch(function(error) {
        console.error('Error uploading images:', error);
    });
}
function update(noteID,noteArray){
  const existingNote = getNoteDataById(noteID);
  console.log(noteArray)
  if (existingNote.title !== noteArray.title || existingNote.text !== noteArray.text || imgWrappers.length !== existingNote.images) {
    updateData(noteArray, noteID)
    console.log("update")
  } else {
    console.log("No changes");
  }
}
function push(noteArray,images){
  if(noteArray.title.length !== 0 || noteArray.content.length !== 0 || images !== 0 ) {
    console.log("push")
    pushData(noteArray)
  }else{
    console.log("Please enter both title and text for the note.");
  }
}
export function fileInput(){
  document.querySelector('#fileInput').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var imgWrapper = document.createElement('div');
        imgWrapper.className = "img-wrapper w-100 bg-primary p-0 position-relative";
        // imgWrapper.classList.add("col"); // If you want to add this class separately
        
        var img = document.createElement('img');
        img.setAttribute("id", "upload-img");
        img.className = "w-100 h-auto";
        
        var removeButton = document.createElement('button');
        removeButton.className = 'remove-img position-absolute btn rounded-3 m-2 p-1';
        removeButton.style.bottom = "0";
        removeButton.style.right = "0";
        removeButton.style.backgroundColor = "rgba(255, 255, 255, 0.475)";
      
        removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

        imgWrapper.appendChild(removeButton);
        imgWrapper.appendChild(img);
    
        var file = this.files[0]; // Get the file object directly

        // Set up a FileReader to read the file as a data URL
        var reader = new FileReader();
        console.log(file)
        reader.onload = function(event) {
        img.onload = () => {
          URL.revokeObjectURL(img.src); // no longer needed, free memory
          var imgContainer = document.querySelector('.img-container');
          imgContainer.classList.remove("d-none")
          imgContainer.classList.add("d-block")
          imgContainer.appendChild(imgWrapper);
          removeImgListener();
        };
        img.src = event.target.result;
        };
        reader.readAsDataURL(file); 
    }
  });
}
export function removeImgListener(){
  document.querySelectorAll('.remove-img').forEach((element) => {
      element.addEventListener('click', function() {
          var imgWrapper = this.parentElement;
          imgWrapper.remove(); // Remove the image wrapper completely
          updateImgContainerVisibility();
      });
  });
}
function updateImgContainerVisibility() {
  var imgContainer = document.querySelector('.img-container');
  var imgWrappers = document.querySelectorAll('.img-wrapper');
  if (imgWrappers.length === 0) {
    imgContainer.classList.remove("d-block")
    imgContainer.classList.add("d-done")
  }
}
function addBtnNote(){
  document.getElementById('add-note-btn').addEventListener('click', function() {
    const noteTitle = document.querySelector("#inputed-note-title");
    noteTitle.value = "";
    const noteText = document.querySelector("#inputed-note-text");
    noteText.value = "";
    noteText.style.height = 'auto';
    noteText.focus();
    var modal = document.getElementById('exampleModal');
    modal.removeAttribute("noteID")
    const pin = document.querySelector('#pin-btn');
    pin.classList.contains("pinned")
    pin.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg > `;
    const modalContent = document.querySelector('#note-modal');
    modalContent.style.backgroundColor = '';
    document.querySelector('#bg-color-dropdown-menu').style.backgroundColor = '';
    document.querySelectorAll('#background-color').forEach(function(element) {
        element.classList.remove("active");
    });
    document.querySelectorAll(".card-btn").forEach(element => {
        element.classList.add("d-none")
    })
    var imgContainer = document.querySelector('.img-container')
    imgContainer.innerHTML = '';
    imgContainer.classList.remove("d-block")
    imgContainer.classList.add("d-done")
});
}
function pinBtnListener(){
  document.querySelector('#pin-btn').addEventListener('click', function(e){
    console.log("adsad")
    const pinBtn = this; 
    pinBtn.classList.toggle("pinned");
    if (pinBtn.classList.contains("pinned")) {
        pinBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M680-840v80h-40v327l-80-80v-247H400v87l-87-87-33-33v-47h400ZM480-40l-40-40v-240H240v-80l80-80v-46L56-792l56-56 736 736-58 56-264-264h-6v240l-40 40ZM354-400h92l-44-44-2-2-46 46Zm126-193Zm-78 149Z"/></svg>`;
    } else {
        pinBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>`;
    }
  });
}
function bgColorListener(){
  document.querySelectorAll('#background-color').forEach(function(element) {
    element.classList.remove("active");
    element.addEventListener('click', function() {
        const color = element.getAttribute('color');
        
        element.classList.add("active");

        const modalContent = document.querySelector('#note-modal');
        if(modalContent.classList.contains('bg-white')){
            modalContent.classList.remove('bg-white');
        }
        modalContent.style.backgroundColor = ''
        modalContent.style.backgroundColor = color

        document.querySelector('#bg-color-dropdown-menu').style.backgroundColor = color;
        document.querySelectorAll('#background-color').forEach(function(otherElement) {
            if (otherElement !== element) {
                otherElement.classList.remove("active");
            }
        });

    });
  });
}
export function autoResizeTextarea(){
  document.getElementById('inputed-note-text').addEventListener('input', function(){
    const textarea = document.getElementById('inputed-note-text');
    textarea.style.height = 'auto'; 
    textarea.style.height = (textarea.scrollHeight) + 'px';
  });
}
export function modal(){
    let modalHtml = 
    `<button id="add-note-btn"  type="button" class="rounded-circle btn btn-dark position-fixed text-white m-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
       <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" fill="white"/>
      </svg>
    </button>
    <div class="modal fade p-2" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog border-1 modal-dialog-centered modal-dialog-scrollable position-relative">
    <div id="note-modal" class="modal-content rounded-3 bg-white shadow-sm" >
      <div class="modal-body d-flex flex-column gap-1 h-auto position-relative p-0">
        <div class="img-container row w-100 d-none bg-danger p-0 m-0">

        </div>
        <div class="d-flex align-items-center justify-content-center pt-3 px-3">
            <input type="text" class="form-control m-0 p-0 border-0 shadow-none bg-transparent" placeholder="Title" id="inputed-note-title">     
        </div>
        <form>
          <div class="mb-2 px-3">
            <textarea placeholder="note" id="inputed-note-text" class=" form-control bg-transparent p-0 border-0 shadow-none resize-none" rows="3" id="message-text" style="resize: none; overflow:hidden;"></textarea>
          </div>
        </form>
        <button id="pin-btn" type="button" class=" m-2 p-1 btn rounded-circle position-absolute d-flex justify-content-cetner align-items-center" style="top:0;right:0;background-color: rgba(255, 255, 255, 0.475);">
          <svg class="shadow-lg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg     
        </button>
      </div>
      <div class="modal-footer p-1 py-0 shadow-lg border-0">
        <div class="row w-100 align-items-center">
            <div class="col p-0"> <!-- First column -->
                <ul class="list-group list-group-horizontal p-0 gap-1 " id="footer-btn">
                    <li class="list-group-item rounded-circle p-0 bg-transparent">
                        <div class="btn-group ">
                            <button type="button" class="p-0 pb-1 rounded-circle border-0 bg-transparent dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
                                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/>
                              </svg>
                            </button>
                            <ul id="bg-color-dropdown-menu" class="dropdown-menu p-2 rounded-3" style="width: auto;">
                              <ul class="list-group list-group-horizontal p-0 gap-2 bg-color bg-transparent">
                              <li id="background-color" class="list-group-item p-1 rounded-circle d-flex active bg-transparent" color="white">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M800-436q0 36-8 69t-22 63l-62-60q6-17 9-34.5t3-37.5q0-47-17.5-89T650-600L480-768l-88 86-56-56 144-142 226 222q44 42 69 99.5T800-436Zm-8 380L668-180q-41 29-88 44.5T480-120q-133 0-226.5-92.5T160-436q0-51 16-98t48-90L56-792l56-56 736 736-56 56ZM480-200q36 0 68.5-10t61.5-28L280-566q-21 32-30.5 64t-9.5 66q0 98 70 167t170 69Zm-37-204Zm110-116Z"/></svg>
                              </li>
                              ${(() => {
                                let html = '';
                                colorPalette().forEach(color => {
                                  html += `<li id="background-color" class="list-group-item p-1 rounded-circle d-flex" 
                                            style="background-color: ${color};" color="${color}"></li>`;
                                })
                                return html;
                              })()}
                              </ul>
                            </ul>
                        </div>
                    </li>
                    <li class="list-group-item p-0 pt-2 rounded-circle  bg-transparent"">
                      <label class="form-label bg-transparent" for="fileInput">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg></label>
                        <input type="file" class="form-control" id="fileInput" style="display: none;" accept="image/*">
                    </li>
                    <li class="list-group-item p-0 rounded-circle d-none bg-transparent card-btn" id="delete-btn" data-bs-dismiss="modal">
                       <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </li>
                  </ul>
            </div>
            <div class="col p-0"> <!-- Second column -->
                <button id="add-note" type="button" class="btn btn-secondary py-1 float-end bg-transparent border-0 text-black" data-bs-dismiss="modal">save</button>
            </div>
            <!--  -->
        </div>
    </div>
  
    </div>
    </div>
    </div>`;
    
    return modalHtml;
}
function colorPalette() {
    const lightColors = [
      "#FF99FF", 
      "#FFFFCC", 
      "#FFCCFF", 
      "#CCFFFF", 
      "#FFCCCC", 
      "#CCCCFF"
    ];
    return lightColors;
} 
