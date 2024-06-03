import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  const appointmentsLink = document.getElementById("appointments-link");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const loginEmail = loginForm["loginEmail"].value;
      const loginPassword = loginForm["password"].value;

      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(() => {
          console.log("Login success");
          window.location.href = "appointment.html"; // Redirect to appointment page
        })
        .catch((err) => {
          const loginError = document.getElementById("loginError");
          loginError.innerText = err.message;
        });
    });
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          console.log("Logout success");
          window.location.href = "index.html"; // Redirect to home page
        })
        .catch((err) => {
          console.error("Logout error: ", err);
        });
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginLink.style.display = "none";
      logoutLink.style.display = "inline";
      appointmentsLink.style.display = "inline";
    } else {
      loginLink.style.display = "inline";
      logoutLink.style.display = "none";
      appointmentsLink.style.display = "none";
    }
  });
});
