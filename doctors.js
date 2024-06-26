const doctorsBlock = document.querySelector("#doctors");
const title = document.createElement("h1");
const filterBlock = document.querySelector(".filter-block");
const myUl = document.querySelector("ul");
title.textContent = "Our Doctors";
title.classList.add("doctors-title");

doctorsBlock.appendChild(title);

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const appointmentDetailsSection = document.getElementById(
  "appointment-details"
);
const selectedAppointmentDiv = document.getElementById("selected-appointment");

async function fetchDoctors() {
  try {
    const response = await fetch("doctors.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayDoctors() {
  const data = await fetchDoctors();
  if (data) {
    const doctorUl = document.createElement("ul");

    data.forEach((doctor) => {
      const doctorItem = createDoctorItem(doctor);
      doctorUl.appendChild(doctorItem);
    });

    doctorsBlock.appendChild(doctorUl);

    const appointmentButtons = document.querySelectorAll(".appointment-btn");
    appointmentButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const clickedDoctor = event.target.closest("li");
        const otherDoctorItems = Array.from(doctorUl.children).filter(
          (item) => item !== clickedDoctor
        );
        otherDoctorItems.forEach((item) => (item.style.display = "none"));
        showConfirmationButton(clickedDoctor);
      });
    });
  }
}

function createDoctorItem(doctor) {
  const doctorItem = document.createElement("li");

  const doctorImg = document.createElement("img");
  doctorImg.src = doctor.img;
  doctorImg.alt = doctor.fullName;
  doctorItem.appendChild(doctorImg);

  const doctorName = document.createElement("h2");
  doctorName.textContent = doctor.fullName;
  doctorItem.appendChild(doctorName);

  const doctorSpecialization = document.createElement("p");
  doctorSpecialization.textContent = doctor.specialization;
  doctorItem.appendChild(doctorSpecialization);

  const doctorRoom = document.createElement("p");
  doctorRoom.textContent = doctor.roomNumber;
  doctorItem.appendChild(doctorRoom);

  const appointmentBtn = document.createElement("button");
  appointmentBtn.textContent = "Choose";
  appointmentBtn.classList.add("appointment-btn");
  appointmentBtn.addEventListener("click", () => {
    doctorsBlock.className = "doctors-on-click";
    filterBlock.style.display = "none";
    title.style.display = "none";
  });

  doctorItem.appendChild(appointmentBtn);

  return doctorItem;
}

function showConfirmationButton(clickedDoctor) {
  clickedDoctor.style.display = "block";

  const appointmentBtn = clickedDoctor.querySelector(".appointment-btn");

  appointmentBtn.style.display = "none";

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm Doctor";
  confirmButton.classList.add("confirm-doctor-btn");
  clickedDoctor.after(confirmButton);

  confirmButton.addEventListener("click", () => {
    const dateForm = createDateForm();
    clickedDoctor.appendChild(dateForm);
    confirmButton.style.display = "none";
    const doctorInfo = clickedDoctor.querySelectorAll("h2, p, img");
    doctorInfo.forEach((info) => {
      info.style.display = "none";
    });
  });
}

function createDateForm() {
  const dateForm = document.createElement("form");
  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Choose a date for your appointment:";
  dateLabel.setAttribute("for", "appointment-date");
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "appointment-date";
  dateInput.name = "appointment-date";
  dateInput.required = true;


  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  dateInput.min = today.toISOString().split('T')[0];
  dateInput.max = maxDate.toISOString().split('T')[0];
  dateInput.addEventListener("input", () => {
    const chosenDate = new Date(dateInput.value);
    const chosenDay = chosenDate.getDay();
    if (chosenDay === 0) {
      alert("Please choose a date that is not a Sunday.");
      dateInput.value = "";
    } else if (chosenDate < today) {
      alert("Please choose a date that is not in the past.");
      dateInput.value = "";
    } else if (chosenDate > maxDate) {
      alert("Please choose a date within the next 6 months.");
      dateInput.value = "";
    }
  });



  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.textContent = "Next";
  nextButton.classList.add("next-btn");
  dateForm.appendChild(dateLabel);
  dateForm.appendChild(dateInput);
  dateForm.appendChild(nextButton);
  doctorsBlock.className = "doctors-before-click";

  nextButton.addEventListener("click", () => {
    const chosenDate = dateInput.value;
    const today = new Date().toISOString().split('T')[0];
    if (!chosenDate) {
      alert("Please choose a date");
      return;
    }
    if (chosenDate < today) {
      alert("Please choose a valid date");
      return;
    }
    dateForm.style.display = "none";
    const timeForm = createTimeForm(chosenDate);
    dateForm.parentElement.appendChild(timeForm);
  });

  return dateForm;
}


function createTimeForm(chosenDate) {
  const timeForm = document.createElement("form");
  const timeLabel = document.createElement("label");
  timeLabel.textContent = `Choose a time slot for ${chosenDate}:`;
  timeLabel.setAttribute("for", "appointment-time");

  const timeOptions = [
    { value: "09:00", text: "09:00" },
    { value: "09:30", text: "09:30" },
    { value: "10:00", text: "10:00" },
    { value: "10:30", text: "10:30" },
    { value: "11:00", text: "11:00" },
    { value: "14:00", text: "14:00" },
    { value: "14:30", text: "14:30" },
    { value: "15:00", text: "15:00" },
    { value: "15:30", text: "15:30" },
    { value: "16:00", text: "16:00" },
    { value: "16:30", text: "16:30" },
    { value: "17:00", text: "17:00" }
  ];

  const timeGrid = document.createElement("div");
  timeGrid.classList.add("time-grid");

  timeOptions.forEach((option) => {
    const timeButton = document.createElement("button");
    timeButton.type = "button";
    timeButton.value = option.value;
    timeButton.textContent = option.text;
    timeButton.classList.add("time-button");
    timeGrid.appendChild(timeButton);
    timeButton.addEventListener("click", () => {
      document.querySelectorAll(".time-button").forEach(btn => btn.classList.remove("selected"));
      timeButton.classList.add("selected");
    });
  });

  const confirmButton = document.createElement("button");
  confirmButton.type = "submit";
  confirmButton.textContent = "Next";
  confirmButton.classList.add("confirm-btn");

  timeForm.appendChild(timeLabel);
  timeForm.appendChild(timeGrid);
  timeForm.appendChild(confirmButton);

  confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    const chosenTimeButton = timeGrid.querySelector(".selected");
    if (!chosenTimeButton) {
      alert("Please select a time slot.");
      return;
    }
    doctorsBlock.style.display = "none";


    const chosenTime = chosenTimeButton.value;
    const doctorElement = timeForm.parentElement;
    const doctorName = doctorElement.querySelector("h2").textContent;
    const doctorImgSrc = doctorElement.querySelector("img").src;
    const doctorSpecialization =
      doctorElement.querySelector("p:nth-of-type(1)").textContent;
    const doctorRoom =
      doctorElement.querySelector("p:nth-of-type(2)").textContent;

    const appointment = {
      doctor: doctorName,
      date: chosenDate,
      time: chosenTime,
      specialization: doctorSpecialization,
      room: doctorRoom,
      img: doctorImgSrc
    };
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    selectedAppointmentDiv.innerHTML = "";

    const doctorImg = document.createElement("img");
    doctorImg.src = doctorImgSrc;
    doctorImg.alt = doctorName;
    selectedAppointmentDiv.appendChild(doctorImg);

    const doctorPara = document.createElement("p");
    doctorPara.innerHTML = `<strong>Doctor:</strong> ${appointment.doctor}`;
    selectedAppointmentDiv.appendChild(doctorPara);

    const datePara = document.createElement("p");
    datePara.innerHTML = `<strong>Date:</strong> ${appointment.date}`;
    selectedAppointmentDiv.appendChild(datePara);

    const timePara = document.createElement("p");
    timePara.innerHTML = `<strong>Time:</strong> ${appointment.time}`;
    selectedAppointmentDiv.appendChild(timePara);

    const specializationPara = document.createElement("p");
    specializationPara.innerHTML = `<strong>Specialization:</strong> ${doctorSpecialization}`;
    selectedAppointmentDiv.appendChild(specializationPara);

    const roomPara = document.createElement("p");
    roomPara.innerHTML = `<strong>Room Number:</strong> ${doctorRoom}`;
    selectedAppointmentDiv.appendChild(roomPara);

    timeForm.style.display = "none";
    appointmentDetailsSection.style.display = "flex";

    const goToProfileLink = document.createElement("a");
    goToProfileLink.textContent = "Go to Profile";
    goToProfileLink.classList.add("back-btn");
    goToProfileLink.href = "./profile.html";
    selectedAppointmentDiv.after(goToProfileLink);
  });

  return timeForm;
}


function filterDoctors() {
  const specializationSelect = document.getElementById("specialization-select");

  specializationSelect.addEventListener("change", () => {
    const selectedSpecialization = specializationSelect.value;
    const doctorItems = document.querySelectorAll("#doctors ul li");

    doctorItems.forEach((doctorItem) => {
      const doctorSpecialization = doctorItem.querySelector("p:nth-of-type(1)").textContent;

      if (selectedSpecialization === "all" || doctorSpecialization === selectedSpecialization) {
        doctorItem.style.display = "";
      } else {
        doctorItem.style.display = "none";
      }
    });
  });
}

async function fetchSpecializations() {
  try {
    const response = await fetch("doctors.json");
    const data = await response.json();
    const specializations = data.map((doctor) => doctor.specialization);
    return specializations;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displaySpecializations() {
  const specializations = await fetchSpecializations();
  if (specializations) {
    const specializationSelect = document.getElementById("specialization-select");
    specializations.forEach((specialization) => {
      const option = document.createElement("option");
      option.value = specialization;
      option.textContent = specialization;
      specializationSelect.appendChild(option);
    });
  }
}

/*calling functions*/
filterDoctors();
displaySpecializations();

filterDoctors();

/*calling function*/

displayDoctors();