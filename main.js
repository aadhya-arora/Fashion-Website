import { showFirstName } from "./signup.js";

var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

window.onload = function () {
  if (window.innerWidth >= 1024) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let msg = document.getElementById("welcome-msg");
let firstName = showFirstName(event);
msg.innerText = "Welcome, " + firstName + "!";
