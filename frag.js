const likeIcons = document.querySelectorAll(".like");

likeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("filled");
  });
});

function scroll() {
  const header = document.querySelector(".header");
  const dropbtn = document.querySelector(".dropbtn");

  if (window.scrollY > 0) {
    header.style.backgroundColor = "White";
    header.style.color = "Black";
    dropbtn.style.color = "Black";
  } else {
    header.style.backgroundColor = "transparent";
    header.style.color = "white";
    dropbtn.style.color = "white";
  }
}

window.addEventListener("scroll", scroll);

function fun1() {
  document.getElementById("more").style.display = "flex";
  document.getElementById("perfumes").style.height = "1050px";
  document.querySelector(".cta").style.display = "none";
  document.querySelector(".cta2").style.display = "flex";
}

function hide() {
  document.getElementById("more").style.display = "none";
  document.getElementById("perfumes").style.height = "600px";
  document.querySelector(".cta").style.display = "flex";
  document.querySelector(".cta2").style.display = "none";
}

function fun3() {
  document.getElementById("more2").style.display = "flex";
  document.getElementById("beauty").style.height = "1050px";
  document.querySelector(".cta1").style.display = "none";
  document.querySelector(".cta3").style.display = "flex";
}

function hide1() {
  document.getElementById("more2").style.display = "none";
  document.getElementById("beauty").style.height = "600px";
  document.querySelector(".cta1").style.display = "flex";
  document.querySelector(".cta3").style.display = "none";
}
