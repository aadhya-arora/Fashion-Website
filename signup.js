document.addEventListener("DOMContentLoaded", function () {
  let phoneInput = document.getElementById("input"); // Phone input
  let errorDiv = document.getElementById("error"); // Error div
  let form = document.getElementById("signup-form"); // Signup form

  // Check if form and elements exist
  if (!form || !phoneInput || !errorDiv) {
    console.error("One or more elements are missing in the DOM");
    return;
  }

  // Phone input validation
  phoneInput.onblur = function () {
    if (phoneInput.value.length !== 10) {
      phoneInput.classList.add("invalid");
      errorDiv.innerText = "Phone Number Incorrect";
      document.getElementById("btn").disabled = true;
    } else {
      document.getElementById("btn").disabled = false;
    }
  };

  phoneInput.onfocus = function () {
    if (this.classList.contains("invalid")) {
      this.classList.remove("invalid");
      errorDiv.innerHTML = "";
    }
  };

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const username = document.getElementById("username").value; // Use the correct ID
    const phone = phoneInput.value;
    const dob = document.getElementById("dob").value; // Use the correct ID
    const password = document.getElementById("password").value; // Use the correct ID

    const user = {
      firstName,
      lastName,
      username,
      phone,
      dob,
      password,
    };

    // Store user data in local storage
    localStorage.setItem("userData", JSON.stringify(user));
    console.log(user);

    // Uncomment to redirect after signup
    // window.location.href = "index.html";
  });
});
