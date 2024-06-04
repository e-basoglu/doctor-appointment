import { doc, setDoc } from "firebase/firestore";
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

const doctorsBlock = document.querySelector("#doctors");
const title = document.createElement("h1");
title.textContent = "Our Doctors";
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
    data.forEach((doctor) => {
      const doctorUl = document.createElement("ul");
      const doctorItem = createDoctorItem(doctor);
      doctorUl.appendChild(doctorItem);
      doctorsBlock.appendChild(doctorUl);
    });

    const appointmentButtons = document.querySelectorAll(".appointment-btn");
    appointmentButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const clickedDoctor = event.target.closest("ul");
        const otherDoctorItems = Array.from(doctorsBlock.children).filter(
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
  clickedDoctor.appendChild(confirmButton);

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
    if (!chosenDate) {
      alert("Please choose a date");
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
  const timeSelect = document.createElement("select");
  timeSelect.id = "appointment-time";
  timeSelect.name = "appointment-time";
  timeSelect.required = true;
  const timeOptions = [
    { value: "09:00", text: "09:00" },
    { value: "10:00", text: "10:00" },
    { value: "11:00", text: "11:00" },
    { value: "14:00", text: "14:00" },
    { value: "15:00", text: "15:00" },
    { value: "16:00", text: "16:00" },
  ];
  timeOptions.forEach((option) => {
    const timeOption = document.createElement("option");
    timeOption.value = option.value;
    timeOption.textContent = option.text;
    timeSelect.appendChild(timeOption);
  });
  const confirmButton = document.createElement("button");
  confirmButton.type = "submit";
  confirmButton.textContent = "Confirm";
  confirmButton.classList.add("confirm-btn");

  timeForm.appendChild(timeLabel);
  timeForm.appendChild(timeSelect);
  timeForm.appendChild(confirmButton);

  confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    const chosenTime = timeSelect.value;
    const doctorName = timeForm.parentElement.querySelector("h2").textContent;

    const appointment = {
      doctor: doctorName,
      date: chosenDate,
      time: chosenTime,
    };
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    selectedAppointmentDiv.innerHTML = "";
    const doctorPara = document.createElement("p");
    doctorPara.innerHTML = `<strong>Doctor:</strong> ${appointment.doctor}`;
    const datePara = document.createElement("p");
    datePara.innerHTML = `<strong>Date:</strong> ${appointment.date}`;
    const timePara = document.createElement("p");
    timePara.innerHTML = `<strong>Time:</strong> ${appointment.time}`;
    selectedAppointmentDiv.appendChild(doctorPara);
    selectedAppointmentDiv.appendChild(datePara);
    selectedAppointmentDiv.appendChild(timePara);

    timeForm.style.display = "none";
    appointmentDetailsSection.style.display = "block";

    const cancelAppointmentBtn = document.getElementById(
      "cancel-appointment-btn"
    );
    cancelAppointmentBtn.style.display = "block";
    const backToDoctorsBtn = document.createElement("button");
    backToDoctorsBtn.textContent = "Back to Doctors";
    backToDoctorsBtn.classList.add("back-btn");
    backToDoctorsBtn.addEventListener("click", () => {
      appointmentDetailsSection.style.display = "none";
      displayDoctors();
      backToDoctorsBtn.style.display = "none";
    });
    selectedAppointmentDiv.appendChild(backToDoctorsBtn);
  });

  return timeForm;
}

await setDoc(doc(db, "appo", "appo-1"), {
  doctor: doctorName,
  date: chosenDate,
  time: chosenTime,
});

const cancelButton = document.getElementById("cancel-appointment-btn");
cancelButton.addEventListener("click", () => {
  localStorage.removeItem("appointments");
  appointmentDetailsSection.style.display = "none";
  doctorsBlock.style.display = "block";
  cancelButton.style.display = "none";
});

displayDoctors();
