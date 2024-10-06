input.onblur = function () {
  if (input.value.length != 10) {
    input.classList.add("invalid");
    error.innerText = "Phone Number Incorrect";
    document.getElementById("btn").disabled = true;
  } else {
    document.getElementById("btn").disabled = false;
  }
};

input.onfocus = function () {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    error.innerHtml = "";
  }
};
