import {getDatabase, ref, push,get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const database = getDatabase();
const userRef = ref(database, 'users/');

export function loginUser(userName, passWord, callback){
  onValue(userRef, (snapshot) => {
      const users = snapshot.val(); 
      if (users) {
        for (const key in users) {
          const user = users[key];
          if (user.userName == userName && user.passWord == passWord) {
            localStorage.removeItem('log-id')
            let logid = JSON.parse(localStorage.getItem('log-id')) || []; // Initialize logid if it doesn't exist
            logid = key;
            localStorage.setItem('log-id', JSON.stringify(logid));
            console.log("Asd")
            callback(true); // Call the callback with true if login is successful
            return;
          }
        }
      }
      callback(false); // Call the callback with false if no matching user is found
  });
}
export function signupUser(userName, passWord){
  const user = {
      userName: userName,
      passWord: passWord
  };
  
  const newUserRef = push(userRef, user); // Push user object to userRef and retrieve the reference
  let logid = JSON.parse(localStorage.getItem('log-id')) || []; // Initialize logid if it doesn't exist
  logid = newUserRef.key;
  localStorage.setItem('log-id', JSON.stringify(logid));
  const userKey = newUserRef.key;

}