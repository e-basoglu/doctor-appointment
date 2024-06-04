import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
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
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");
  const profileLink = document.getElementById("profile-link");
  const logoutLink = document.getElementById("logout-link");
  const appointmentLink = document.getElementById("appointment-link");

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
      if (loginLink) loginLink.style.display = "none";
      if (signupLink) signupLink.style.display = "none";
      if (logoutLink) logoutLink.style.display = "inline";
      if (appointmentLink) appointmentLink.style.display = "inline";
      if (profileLink) profileLink.style.display = "inline";
    } else {
      if (loginLink) loginLink.style.display = "inline";
      if (signupLink) signupLink.style.display = "inline";
      if (logoutLink) logoutLink.style.display = "none";
      if (appointmentLink) appointmentLink.style.display = "none";
      if (profileLink) profileLink.style.display = "none";
    }
  });
});
