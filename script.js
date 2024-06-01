document.getElementById("login-link").addEventListener("click", function () {
  // Simulate a login process

  document.getElementById("login-link").style.display = "none";
  document.getElementById("logout-link").style.display = "inline";
});

document.getElementById("logout-link").addEventListener("click", function () {
  // Simulate a logout process

  document.getElementById("login-link").style.display = "inline";
  document.getElementById("logout-link").style.display = "none";
});

document.querySelectorAll(".appointment-link").forEach((element) => {
  element.addEventListener("click", function (event) {
    event.preventDefault();

    // Redirect to the appointment page (this page doesn't exist yet)

    alert("Redirecting to appointment page...");
  });
});
// error message email
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("login");
  const emailError = document.getElementById("emailError");

  loginForm.addEventListener("submit", (event) => {
    emailError.style.display = "none";

    if (!emailInput.validity.valid) {
      event.preventDefault();
      if (emailInput.validity.typeMismatch) {
        emailError.textContent = "Please enter a valid email address.";
      } else if (emailInput.validity.valueMissing) {
        emailError.textContent = "This field is required.";
      }
      emailError.style.display = "block";
    }
  });
});
