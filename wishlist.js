document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.querySelector(".wishlist-container");
  const wishlistItemsContainer = document.getElementById("wishlist-items");
  const emptyWishlistMessage = document.querySelector(".empty");

  function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
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
      wishlist.forEach((item, index) => {
        const wishlistItem = document.createElement("div");
        wishlistItem.classList.add("wishlist-item");
        wishlistItem.innerHTML = `
          <div class="wishlist-card" style="display: flex; align-items: center; margin-bottom: 16px;">
            <img src="${item.img}" alt="${item.name}" style="width: 120px; height: auto; border-radius: 8px;" />
            <div style="margin-left: 12px;">
              <p style="margin: 5px 0;"><strong>${item.name}</strong></p>
              <p style="margin: 5px 0;">${item.price} INR</p>
              <button class="remove-wishlist" data-index="${index}">Remove</button>
            </div>
          </div>
        `;
        wishlistItemsContainer.appendChild(wishlistItem);
      });
    }
  }

  // Remove from wishlist
  wishlistItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-wishlist")) {
      let wishlist = getWishlist();
      const index = event.target.dataset.index;
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

      // Try to get image from <img>, fallback to background-image
      const imgTag = displayItem.querySelector("img");
      let imgSrc = imgTag?.src || "";

      if (!imgSrc) {
        const bgImageDiv = button.parentElement;
        const bgStyle = window.getComputedStyle(bgImageDiv).backgroundImage;
        const match = bgStyle.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) {
          const raw = match[1];
          imgSrc = raw.startsWith("http") ? raw : window.location.origin + raw;
        }
      }

      let wishlist = getWishlist();
      const alreadyAdded = wishlist.some((item) => item.name === name);

      if (!alreadyAdded) {
        const itemData = { name, price, img: imgSrc };

        wishlist.push(itemData);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        updateWishlist();

        // Save to server
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
