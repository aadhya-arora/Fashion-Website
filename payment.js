document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("payment-cart-items");
  const subtotalElem = document.getElementById("subtotal");
  const taxElem = document.getElementById("tax");
  const shippingElem = document.getElementById("shipping");
  const totalElem = document.getElementById("total");
  const placeOrderBtn = document.querySelector("button");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    if (placeOrderBtn) placeOrderBtn.disabled = true;
    return;
  }

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;

    const itemElem = document.createElement("div");
    itemElem.classList.add("payment-item");
    itemElem.innerHTML = `
        <p><strong>${item.name}</strong> — ${item.quantity} × ${item.price} INR</p>
      `;
    container.appendChild(itemElem);
  });

  const tax = subtotal * 0.03;
  const shipping = 150;
  const total = subtotal + tax + shipping;

  subtotalElem.textContent = `${subtotal} INR`;
  taxElem.textContent = `${tax.toFixed(2)} INR`;
  shippingElem.textContent = `${shipping} INR`;
  totalElem.textContent = `${total.toFixed(2)} INR`;

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      const selectedPayment = document.querySelector(
        'input[name="payment"]:checked'
      );
      if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
      }

      const orderData = {
        items: cart.map((item) => `${item.name} (x${item.quantity})`),
        total: `${total.toFixed(2)} INR`,
        paymentMethod: selectedPayment.value,
      };

      fetch("/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          localStorage.removeItem("cart"); // Clear cart
          window.location.href = "main.html"; // Redirect after order
        })
        .catch((err) => {
          console.error("Order error:", err);
          alert("Failed to place order.");
        });
    });
  }
});
