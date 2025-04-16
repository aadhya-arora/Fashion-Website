document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.querySelector(".wishlist-container");
  const wishlistItemsContainer = document.getElementById("wishlist-items");
  const emptyWishlistMessage = document.querySelector(".empty");

  function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  }

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function addToCart(item) {
    let cart = getCart();
    const alreadyInCart = cart.some((cartItem) => cartItem.name === item.name);

    if (!alreadyInCart) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.name} moved to cart!`);
    } else {
      alert(`${item.name} is already in cart.`);
    }
  }

  function updateWishlist() {
    const wishlist = getWishlist();
    wishlistItemsContainer.innerHTML = "";

    if (wishlist.length === 0) {
      emptyWishlistMessage.style.display = "flex";
      wishlistContainer.style.display = "none";
    } else {
      emptyWishlistMessage.style.display = "none";
      wishlistContainer.style.display = "flex";

      wishlist.forEach((item) => {
        if (item.inStock === undefined) item.inStock = Math.random() > 0.2;
        if (item.priceDrop === undefined) item.priceDrop = Math.random() > 0.7 ? Math.floor(item.price * 0.3) : 0;
      });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      wishlist.forEach((item, index) => {
        const wishlistItem = document.createElement("div");
        wishlistItem.classList.add("wishlist-item");
        wishlistItem.innerHTML = `
          <div class="wishlist-card" style="display: flex; align-items: center; margin-bottom: 16px;">
            <img src="${item.img}" alt="${item.name}" style="width: 120px; height: auto; border-radius: 8px;" />
            <div style="margin-left: 12px;">
              <p style="margin: 5px 0;"><strong>${item.name}</strong></p>
              <p style="margin: 5px 0;">
                <strong>₹${item.price}</strong>
                <span class="stock-status" style="margin-left: 10px; padding: 2px 6px; border-radius: 4px; background-color: ${
                  item.inStock ? '#d4edda' : '#f8d7da'
                }; color: ${item.inStock ? '#155724' : '#721c24'};">
                  ${item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
              ${item.priceDrop ? `<p class="price-drop" style="color: #e63946; font-size: 14px;">🔻 Price dropped ₹${item.priceDrop} recently!</p>` : ""}
              <div style="margin-top: 10px;">
                <button class="remove-wishlist" data-index="${index}" style="margin-right: 10px;">Remove</button>
                <button class="move-to-cart" data-index="${index}">Move to Cart</button>
              </div>
            </div>
          </div>
        `;
        wishlistItemsContainer.appendChild(wishlistItem);
      });
    }
  }

  // Remove from wishlist and handle move to cart
  wishlistItemsContainer.addEventListener("click", function (event) {
    let wishlist = getWishlist();

    if (event.target.classList.contains("remove-wishlist")) {
      const index = event.target.dataset.index;
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlist();
    }

    if (event.target.classList.contains("move-to-cart")) {
      const index = event.target.dataset.index;
      const item = wishlist[index];
      addToCart(item);
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlist();
    }
  });

  // Load wishlist on page load
  updateWishlist();

  // Listen to storage changes (in case updated from other tab)
  window.addEventListener("storage", updateWishlist);

  // Optional: Handle adding to wishlist on pages using this same script
  const likeButtons = document.querySelectorAll(".like");

  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const displayItem = button.closest(".disp, .display1");
      const nameElement = displayItem?.querySelector(".text");
      const priceElement = displayItem?.querySelector(".price");

      if (!nameElement || !priceElement) return;

      const name = nameElement.textContent.trim().replace(/\s+/g, " ");
      const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ""));

      const imgTag = displayItem.querySelector("img");
      let imgSrc = imgTag?.src || "";

      if (!imgSrc) {
        const bgImageDiv = button.parentElement;
        const bgStyle = window.getComputedStyle(bgImageDiv).backgroundImage;
        const match = bgStyle.match(/url\(["']?(.*?)?["']?\)/);
        if (match && match[1]) {
          const raw = match[1];
          imgSrc = raw.startsWith("http") ? raw : window.location.origin + raw;
        }
      }

      let wishlist = getWishlist();
      const alreadyAdded = wishlist.some((item) => item.name === name);

      if (!alreadyAdded) {
        const itemData = {
          name,
          price,
          img: imgSrc,
          inStock: Math.random() > 0.2,
          priceDrop: Math.random() > 0.7 ? Math.floor(price * 0.3) : 0,
        };

        wishlist.push(itemData);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        updateWishlist();

        fetch("/add-to-wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "guest",
            itemId: Date.now(),
            itemName: name,
            itemPrice: price,
            itemImage: imgSrc,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log("✅ Wishlist item stored:", data))
          .catch((err) => console.error("❌ Error saving to server:", err));

        button.classList.add("liked");
        alert(`${name} added to wishlist!`);
      } else {
        alert(`${name} is already in your wishlist.`);
      }
    });
  });
});
