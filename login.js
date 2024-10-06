input.onblur = function () {
  if (input.value.length != 10) {
    input.classList.add("invalid");
    error.innerText = "OTP Incorrect";
    document.querySelector(".btn").disabled = true;
  } else {
    document.querySelector(".btn").disabled = false;
  }
};

input.onfocus = function () {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    error.innerHtml = "";
  }
};
