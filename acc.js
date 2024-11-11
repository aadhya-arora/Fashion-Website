const likeIcons = document.querySelectorAll(".like");

likeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("filled");
  });
});

function myFunction() {
  document.getElementById("more").style.display = "flex";
  document.getElementById("neck").style.height = "1060px";
  document.querySelector(".cta").style.display = "none";
  document.querySelector(".cta4").style.display = "flex";
}

function hide() {
  document.getElementById("more").style.display = "none";
  document.getElementById("neck").style.height = "650px";
  document.querySelector(".cta").style.display = "flex";
  document.querySelector(".cta4").style.display = "none";
}

function myFunction2() {
  document.getElementById("more2").style.display = "flex";
  document.getElementById("watches").style.height = "1060px";
  document.querySelector(".cta1").style.display = "none";
  document.querySelector(".cta5").style.display = "flex";
}

function hide1() {
  document.getElementById("more2").style.display = "none";
  document.getElementById("watches").style.height = "650px";
  document.querySelector(".cta1").style.display = "flex";
  document.querySelector(".cta5").style.display = "none";
}

function myFunction4() {
  document.getElementById("more3").style.display = "flex";
  document.getElementById("Bag").style.height = "1060px";
  document.querySelector(".cta2").style.display = "none";
  document.querySelector(".cta6").style.display = "flex";
}

function hide2() {
  document.getElementById("more3").style.display = "none";
  document.getElementById("Bag").style.height = "650px";
  document.querySelector(".cta2").style.display = "flex";
  document.querySelector(".cta6").style.display = "none";
}

function myFunction6() {
  document.getElementById("more4").style.display = "flex";
  document.getElementById("Ear").style.height = "1060px";
  document.querySelector(".cta3").style.display = "none";
  document.querySelector(".cta7").style.display = "flex";
}

function hide3() {
  document.getElementById("more4").style.display = "none";
  document.getElementById("Ear").style.height = "650px";
  document.querySelector(".cta3").style.display = "flex";
  document.querySelector(".cta7").style.display = "none";
}

function subscribed() {
  alert("You have subscribed to our newsletter successfully");
}
