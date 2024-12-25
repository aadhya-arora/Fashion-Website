// document.addEventListener("DOMContentLoaded", function () {
//   let phoneInput = document.getElementById("input");
//   let errorDiv = document.getElementById("error");
//   let form = document.getElementById("signup-form");
//   let submitBtn = document.getElementById("animated-button");

//   if (!form || !phoneInput || !errorDiv) {
//     console.error("One or more elements are missing");
//     return;
//   }

//   phoneInput.onblur = function () {
//     if (phoneInput.value.length !== 10) {
//       phoneInput.classList.add("invalid");
//       errorDiv.innerText = "Phone Number must be 10 digits.";
//       submitBtn.disabled = true;
//     } else {
//       submitBtn.disabled = false;
//       errorDiv.innerText = "";
//     }
//   };

//   phoneInput.onfocus = function () {
//     if (this.classList.contains("Invalid")) {
//       this.classList.remove("Invalid");
//       errorDiv.innerHTML = "";
//     }
//   };

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const firstName = document.getElementById("first-name").value;
//     const lastName = document.getElementById("last-name").value;
//     const username = document.getElementById("username").value;
//     const phone = phoneInput.value;
//     const password = document.getElementById("password").value;

//     const user = {
//       firstName,
//       lastName,
//       username,
//       phone,
//       password,
//     };

//     localStorage.setItem("userData", JSON.stringify(user));
//     console.log(user);

//     window.location.href = "login.html";
//   });
//});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 5011;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).send("Home Page...");
});

const users = [];

app.post("/submit", (req, res) => {
  console.log("Form Data Received:", req.body);

  let user_id;
  if (users.length === 0) {
    user_id = 1;
  } else {
    user_id = users[users.length - 1].id + 1;
  }

  const new_user = {
    id: user_id,
    name: req.body.name,
    email: req.body.email,
    user: req.body.user,
    phone: req.body.phone,
    password: req.body.password,
  };

  users.push(new_user);
  console.log(users);
  res.status(202).json({ message: "User Registered..." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
