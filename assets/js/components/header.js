import { loadLogin } from "../form/login.js";
export function logout(){
    document.getElementById('logout-btn').addEventListener('click', function(){
        localStorage.removeItem('log-id')
        loadLogin()
        var logid = JSON.parse(localStorage.getItem('log-id')) || [];
        console.log(logid)
    });
}
export function loadHeader(){
    let header =
    `
    <div id="header" class="header py-0 px-3 container-fluid d-flex justify-content-between align-items-center">
        <div class="pt-2">
            <h2 class="app-name">Notch</h2>
        </div>
        <div class="btn-group ">
            <button id="account-btn" type="button" class="p-0 rounded-circle border-0 bg-transparent dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
            </button>
            <ul class="dropdown-menu p-2 w-0  rounded-3">
            <li class="dropdown-item p-0 w-0 d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#logout-modal">
                <span>Logout Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
            </li>
            </ul>
        </div>
        <div class="modal fade p-3" id="logout-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header border-0">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Log out?</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body border-0">
                Are you sure you want to log out?
                </div>
                <div class="modal-footer border-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button id="logout-btn" type="button" class="btn btn-dark" data-bs-dismiss="modal">Logout</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
   return header;
}
export function loadPageWrapper(){
    let pageWrapper =
    `
    <div id="page-wrapper" class="container-fluid position-relative px-4 py-2">

    </div>
    `;
    return pageWrapper;
}
