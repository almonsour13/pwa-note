import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyA_vg1GWUxI7iRDNCOs6q8M6VwxMEpUfeU",
  authDomain: "pwa-note-88954.firebaseapp.com",
  databaseURL: "https://pwa-note-88954-default-rtdb.firebaseio.com",
  projectId: "pwa-note-88954",
  storageBucket: "pwa-note-88954.appspot.com",
  messagingSenderId: "816366754389",
  appId: "1:816366754389:web:83d44da74d09571d1f92dc",
  measurementId: "G-NEQT4T0449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);