document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("login-form"); // Ensure this ID matches
  let errorDiv = document.getElementById("error1");

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const usernameInput = document.getElementById("username").value; // Use the correct ID
    const passwordInput = document.getElementById("password").value;

    // Retrieve user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData")); // Ensure this key matches

    // Validate username and password
    if (storedUserData) {
      // Check if the username and password match
      if (
        storedUserData.username === usernameInput && // Compare username
        storedUserData.password === passwordInput
      ) {
        // Successful login
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to home page or another page
      } else {
        // Invalid credentials
        errorDiv.innerText =
          "Incorrect username or password. Please try again.";
      }
    } else {
      errorDiv.innerText = "No user found. Please sign up first.";
    }
  });
});
