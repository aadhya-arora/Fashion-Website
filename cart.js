document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".cart-container");
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");
  const checkoutButton = document.getElementById("checkout-btn");
  const bagElements = document.querySelectorAll(".bag"); // Select all elements with class "bag"

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function updateCart() {
    let cart = getCart();
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
      emptyCartMessage.style.display = "flex";
      cartContainer.style.display = "none"; // Hide cart when empty
      bagElements.forEach((bag) => (bag.style.display = "flex")); // Hide all .bag elements
    } else {
      bagElements.forEach((bag) => (bag.style.display = "none"));
      emptyCartMessage.style.display = "none";
      cartContainer.style.display = "flex";
      cartContainer.style.flexDirection = "column"; // Show cart when items exist
      // Show all .bag elements

      cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <p>${item.name} - ${item.quantity} x ${item.price} INR</p>
          <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
    }

    const tax = subtotal * 0.03;
    const shipping = cart.length > 0 ? 150 : 0;
    const total = subtotal + tax + shipping;
    subtotalElement.textContent = `${subtotal} INR`;
    taxElement.textContent = `${tax.toFixed(2)} INR`;
    totalElement.textContent = `${total.toFixed(2)} INR`;
  }

  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      let cart = getCart();
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  });

  checkoutButton.addEventListener("click", function () {
    let cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      window.location.href = "checkout.html";
    }
  });

  // Listen for storage changes when item is added to cart
  window.addEventListener("storage", function () {
    updateCart();
  });

  updateCart(); // Ensure cart updates on page load
});
