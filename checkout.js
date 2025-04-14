document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    const nameInput = document.getElementById("name");
    const mobileInput = document.getElementById("mobile");

    if (nameInput) nameInput.value = userData.firstName || "";
    if (mobileInput) mobileInput.value = userData.phone || "";
  }
});

const form = document.querySelector("form"); // Ensure this matches your form selector

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch("/submit-address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.message) {
        alert(result.message);
        window.location.href = "/payment.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to save address.");
    });
});
