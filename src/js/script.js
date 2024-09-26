const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;


// About Contact form
const form = document.getElementById("contact-form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") &&
        !phone.classList.contains("error") && !subject.classList.contains("error") &&
        !mess.classList.contains("error")) {
        sendEmail();
        form.reset();
    }
});

function checkInputs() {
    const items = document.querySelectorAll(".item");

    items.forEach((item, index) => {
        item.addEventListener("keyup", () => {
            if (item.value.trim() === "") {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            } else {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
        });

        if (index === 1) { // Email field
            item.addEventListener("keyup", checkEmail);
        }
    });
}

function checkEmail() {
    const emailRegex = /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        errorTxtEmail.innerText = email.value !== "" ? "Enter a valid email address" : "Email Address cannot be empty";
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
        errorTxtEmail.innerText = "";
    }
}

// Send Email (using EmailJS for security)
function sendEmail() {
    emailjs.send("service_id", "template_id", {
        from_name: fullName.value,
        to_name: "jaletakebede@gmail.com",
        message: mess.value,
        reply_to: email.value,
    }).then(function (response) {
        Swal.fire({
            title: "Success!",
            text: "Message sent successfully!",
            icon: "success"
        });
    }, function (error) {
        Swal.fire({
            title: "Error!",
            text: "Message failed to send!",
            icon: "error"
        });
    });
}
