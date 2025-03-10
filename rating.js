document.addEventListener("DOMContentLoaded", () => {
  const likeIcons = document.querySelectorAll(".like");
  const reviewForm = document.getElementById("review-form");

  let rating = 0; // Store the selected rating

  likeIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      rating = index + 1; // Set rating based on clicked star
      likeIcons.forEach((star, i) => {
        if (i <= index) {
          star.style.color = "gold";
          star.style.fontVariationSettings = "'FILL' 1"; // Filled star
        } else {
          star.style.color = "black";
          star.style.fontVariationSettings = "'FILL' 0"; // Empty star
        }
      });
    });
  });

  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("full-name").value;
    const review = document.getElementById("user-review").value;
    const improvement = document.getElementById("improvment").value;

    const formData = { fullname, review, improvement, rating };

    try {
      const response = await fetch("http://localhost:3000/submit-review", {
        // ✅ Fixed endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message); // ✅ Now shows "Review submitted successfully!"
      reviewForm.reset();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  });
});
