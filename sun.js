const likeIcons = document.querySelectorAll(".like");

likeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("filled");
  });
});

function expand() {
  document.getElementById("more1").style.display = "flex";
  document.getElementById("sunglasses").style.height = "1060px";
  document.querySelector(".cta1").style.display = "none";
  document.querySelector(".cta3").style.display = "flex";
}

function hide() {
  document.getElementById("more1").style.display = "none";
  document.getElementById("sunglasses").style.height = "600px";
  document.querySelector(".cta1").style.display = "flex";
  document.querySelector(".cta3").style.display = "none";
}

function expand1() {
  document.getElementById("more2").style.display = "flex";
  document.getElementById("scarf_done").style.height = "1060px";
  document.querySelector(".cta2").style.display = "none";
  document.querySelector(".cta4").style.display = "flex";
}

function hide1() {
  document.getElementById("more2").style.display = "none";
  document.getElementById("scarf_done").style.height = "600px";
  document.querySelector(".cta2").style.display = "flex";
  document.querySelector(".cta4").style.display = "none";
}
