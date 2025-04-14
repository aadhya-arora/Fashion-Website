document.addEventListener("DOMContentLoaded", function () {
  let phoneInput = document.getElementById("input");
  let errorDiv = document.getElementById("error");
  let form = document.getElementById("signup-form");
  let submitBtn = document.getElementById("animated-button");

  if (!form || !phoneInput) {
    console.error("Form or phone input missing");
    return;
  }

  phoneInput.onblur = function () {
    if (phoneInput.value.length !== 10) {
      phoneInput.classList.add("invalid");
      if (errorDiv) errorDiv.innerText = "Phone Number must be 10 digits.";
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
      if (errorDiv) errorDiv.innerText = "";
    }
  };

  phoneInput.onfocus = function () {
    phoneInput.classList.remove("invalid");
    if (errorDiv) errorDiv.innerText = "";
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("first-name").value,
      email: document.getElementById("last-name").value,
      phone: document.getElementById("input").value,
      password: document.getElementById("password").value,
      sign_as: document.getElementById("sign_as").value,
    };

    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Server response:", data);
        alert(data.message);
        if (data.redirect) {
          window.location.href = data.redirect;
        }
      })
      .catch((err) => {
        console.error("❌ Signup failed:", err);
        alert("Signup failed. Try again.");
      });
  });
});
