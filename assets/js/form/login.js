import {loginUser, signupUser} from './auth.js';
import { loadNote } from '../note.js';
const mainWrapper = document.getElementById('main-wrapper');
export function loadLogin(){
      mainWrapper.innerHTML = login();
      loginListener();
      switchToSignUp();
      showPassListener();
}
function loginListener(){
    document.getElementById('login-btn').addEventListener('click', function(){
        const userName = document.getElementById('username');
        const passWord = document.getElementById('password');
        if(userName.value != '' || passWord.value != '' ){ 
        loginUser(userName.value, passWord.value, (success) => {
          if (success) {
            const pageWrapper = document.getElementById('main-wrapper');
            pageWrapper.innerHTML = ''
            loadNote()
          } else {
            console.log("Login failed. Invalid username or password.");
          }
        });
          
        }

    });
}
function signupListener(){
    document.getElementById('signup-btn').addEventListener('click', function(){
        const userName = document.getElementById('username');
        const confirmPassWord = document.getElementById('password');
        const passWord = document.getElementById('confirm-password');
        if(userName.value != '' || passWord.value != '' ||  confirmPassWord.value != ''){
            if(passWord.value == confirmPassWord.value){
              signupUser(userName.value,passWord.value)
                loadNote()
            }else{
              
            }
        }

    });
}
function switchToSignUp(){
    document.getElementById('switch-to-signup-btn').addEventListener('click', function(){
        const pageWrapper = document.getElementById('main-wrapper');
        pageWrapper.innerHTML = signup();
        switchToLoginUp()
        signupListener()
        showPassListener();
    });
}
function switchToLoginUp(){
    document.getElementById('switch-to-login-btn').addEventListener('click', function(){
        const pageWrapper = document.getElementById('main-wrapper');
        pageWrapper.innerHTML = login();
        switchToSignUp();
        loginListener()
        showPassListener()
    });
}
function showPassListener() {
    document.querySelectorAll('#show-password').forEach((element) => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const inputField = this.parentElement.querySelector("input");
            if (inputField) {
                if (inputField.type === "password") {
                    inputField.type = "text";
                    this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>`;
                } else {
                    inputField.type = "password";
                    this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>`;
                }
            }
        });
    });
}






function login(){
    let login = 
    `<div class="container-fluid row justify-content-center align-items-center vh-100 p-0 m-0">
    <div class="card col-sm-6 col-md-6 col-lg-4 shadow-sm p-2">
        <div class="card-header border-0 bg-transparent">
            <h1 class="h3 text-center text-gray-800 font-weight-bold p-2">Notch</h1>
            <h1 class="h6 text-center text-gray-500 font-weight-bold">Login</h1>
        </div>
        <div class="card-body">
            <div class="row gap-3 flex-column">
                <div class="form-group ">
                    <label for="inputEmail4" class="">Username</label>
                    <input class="form-control rounded-3" id="username" placeholder="username" required>
                </div>
                <div class="form-group">
                    <label for="inputEmail4" class="">Password</label>
                    <div class="position-relative p-0">
                        <input type="password" class="form-control rounded-3" id="password" placeholder="password" required>
                        <div id="show-password" class="show-password position-absolute" style="right: 0; top: 0; margin: 5px 10px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                        </div>
                    </div>
                </div>
                <div class="form-group mt-3 row justify-content-center align-items-center w-100 p-0 m-0">
                    <div class="w-100">
                        <button type="submit" id="login-btn" class="btn btn-dark btn-block w-100 rounded-3">Log in</button>
                    </div>
                    <div class="w-100 h-auto d-flex  justify-content-center gap-2 ">
                        <p class="p-0 m-0">Don't have an Account?</p>
                        <a id="switch-to-signup-btn" class="p-0 m-0">signup</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
    return login;
}
function signup(){
    let signup =
    `<div class="container-fluid row justify-content-center align-items-center vh-100 p-0 m-0">
        <div class="card col-sm-6 col-md-6 col-lg-4 shadow-sm p-2">
            <div class="card-header border-0 bg-transparent">
                <h1 class="h3 text-center text-gray-800 font-weight-bold p-2">Notch</h1>
                <h1 class="h6 text-center text-gray-500 font-weight-bold">Sign up</h1>
            </div>
            <div class="card-body">
                <div class="row gap-3 flex-column p-0">
                    <div class="form-group ">
                        <label for="inputEmail4" class="">Username</label>
                        <input class="form-control rounded-3" id="username" placeholder="username" required>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail4" class="">Password</label>
                        <div class="position-relative p-0">
                            <input type="password" class="form-control rounded-3" id="password" placeholder="password" required>
                            <div id="show-password" class="show-password position-absolute" style="right: 0; top: 0; margin: 5px 10px;">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                            </div>
                        </div>
                        
                    </div>
                    <div class="form-group">
                        <label for="inputEmail4" class="">Confirm Password</label>
                        <div class="position-relative p-0">
                            <input type="password" class="form-control rounded-3" id="confirm-password" placeholder="password" required>
                            <div id="show-password" class="show-password position-absolute" style="right: 0; top: 0; margin: 5px 10px;">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                            </div>
                        </div>
                        
                    </div>
                    <div class="form-group mt-2 row justify-content-center align-items-center w-100 p-0 m-0 gap-1">
                        <div class="w-100">
                            <button type="submit" id="signup-btn" class="btn btn-dark btn-block w-100 rounded-3">signup</button>
                        </div>
                        <div class="w-100 h-auto d-flex  justify-content-center gap-2 ">
                            <p class="p-0 m-0">Already have an Account?</p>
                            <a id="switch-to-login-btn" class="p-0 m-0">login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    return signup;
}