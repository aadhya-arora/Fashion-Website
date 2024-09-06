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
}

function fun2() {
  document.getElementById("more").style.display = "none";
  document.getElementById("perfumes").style.height = "600px";
}

document.querySelector("#button").addEventListener("dblclick", fun2);

function fun3() {
  document.getElementById("more2").style.display = "flex";
  document.getElementById("beauty").style.height = "1050px";
}

function fun4() {
  document.getElementById("more2").style.display = "none";
  document.getElementById("beauty").style.height = "600px";
}

document.querySelector("#button2").addEventListener("dblclick", fun4);
