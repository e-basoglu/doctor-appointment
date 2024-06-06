document.addEventListener("DOMContentLoaded", function () {
  const appointmentsUlContainer = document.getElementById("appointmentsUlContainer");
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  // Assign unique ids to appointments if not already present
  appointments = appointments.map((appointment, index) => {
    if (!appointment.id) {
      appointment.id = new Date().getTime() + index;
    }
    return appointment;
  });
  // Sort the appointments by date
  appointments.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (appointments.length === 0) {
    appointmentsContainer.innerHTML = "<p>There is no appointment</p>";
  } else {
    appointments.forEach((appointment) => {
      const card = document.createElement("li");
      card.classList.add("appointment-card");

      card.innerHTML = `
        <img src="${appointment.img}" alt="Doctor Icon">
        <h2>${appointment.doctor}</h2> 
        <p>${appointment.date}</p>
        <p>${appointment.time}</p>
        <button class="delete-btn" data-id="${appointment.id}">Delete</button>
    `;

      appointmentsUlContainer.appendChild(card);
    });
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Delete button event listeners
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        deleteAppointment(id);
      });
    });
  }
});

function deleteAppointment(id) {
  let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];
  appointments = appointments.filter(appointment => appointment.id != id);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  location.reload();
}