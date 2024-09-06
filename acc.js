const likeIcons = document.querySelectorAll(".like");

likeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("filled");
  });
});

function myFunction() {
  document.getElementById("more").style.display = "flex";
  document.getElementById("neck").style.height = "1050px";
}

function myFunction1() {
  document.getElementById("more").style.display = "none";
  document.getElementById("neck").style.height = "600px";
}
document.querySelector(".cta").addEventListener("dblclick", myFunction1);

function myFunction2() {
  document.getElementById("more2").style.display = "flex";
  document.getElementById("watches").style.height = "1050px";
}

function myFunction3() {
  document.getElementById("more2").style.display = "none";
  document.getElementById("watches").style.height = "600px";
}

document.querySelector(".cta1").addEventListener("dblclick", myFunction3);

function myFunction4() {
  document.getElementById("more3").style.display = "flex";
  document.getElementById("Bag").style.height = "1050px";
}

function myFunction5() {
  document.getElementById("more3").style.display = "none";
  document.getElementById("Bag").style.height = "600px";
}
document.querySelector(".cta2").addEventListener("dblclick", myFunction5);

function myFunction6() {
  document.getElementById("more4").style.display = "flex";
  document.getElementById("Ear").style.height = "1050px";
}

function myFunction7() {
  document.getElementById("more4").style.display = "none";
  document.getElementById("Ear").style.height = "600px";
}

document.querySelector(".cta3").addEventListener("dblclick", myFunction7);
