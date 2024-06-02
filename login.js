import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYOLJfSlHW93r6wjYkqhJsxViYWqrl_e4",
  authDomain: "doctor-appointment-83b6b.firebaseapp.com",
  projectId: "doctor-appointment-83b6b",
  storageBucket: "doctor-appointment-83b6b.appspot.com",
  messagingSenderId: "270940241037",
  appId: "1:270940241037:web:fc26881b1011398a12f6c4",
  measurementId: "G-M4HD98XYZ1",
};

// Firebase uygulamasını başlatma
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginEmail = loginForm["loginEmail"].value;
    const loginPassword = loginForm["password"].value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log("Login successful");
        window.location.href = "index.html";
      })
      .catch((error) => {
        const loginError = document.getElementById("loginError");
        loginError.innerText = error.message;
      });
  });
});
