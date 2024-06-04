document.addEventListener("DOMContentLoaded", function () {
    const appointmentsUlContainer = document.getElementById(
      "appointmentsUlContainer"
    );
    const appointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    if (appointments.length === 0) {
      appointmentsContainer.innerHTML = "<p>There is no appointment</p>";
    } else {
      appointments.forEach((appointment, index) => {
        const card = document.createElement("li");
        card.classList.add("appointment-card");

        card.innerHTML = `
        <img src="assets/doctor-icon.svg" alt="Doctor Icon">
        <h2>${appointment.doctor}</h2> 
        <p>${appointment.date}</p>
        <p>${appointment.time}</p>
        <button class="delete-btn" data-index="${index}">Delete</button>
    `;

        appointmentsUlContainer.appendChild(card);
      });

      // Delete button event listeners
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          deleteAppointment(index);
        });
      });
    }
  });

  function deleteAppointment(index) {
    let appointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    location.reload();
  }