import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const signupEmail = signupForm["signupEmail"].value;
      const signupPassword = signupForm["password"].value;

      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then(() => {
          console.log("signup success");
          location = "index.html";
        })
        .catch((err) => {
          const signupError = document.getElementById("signupError");
          signupError.innerText = err.message;
        });
    });
  } else {
    console.error("signupForm element not found");
  }
});
