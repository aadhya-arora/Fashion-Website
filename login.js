document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("login-form");
  let errorDiv = document.getElementById("error1");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      if (
        storedUserData.username === usernameInput &&
        storedUserData.password === passwordInput
      ) {
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        errorDiv.innerText =
          "Incorrect username or password. Please try again.";
      }
    } else {
      errorDiv.innerText = "No user found. Please sign up first.";
    }
  });
});
