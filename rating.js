const likeIcons = document.querySelectorAll(".like");

likeIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    likeIcons.forEach((star, i) => {
      if (i <= index) {
        star.classList.add("like-filled"); // Fill stars up to the clicked one
      } else {
        star.classList.remove("like-filled"); // Unfill remaining stars
      }
    });
  });
});
