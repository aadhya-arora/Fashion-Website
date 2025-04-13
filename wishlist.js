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
  <div class="wishlist-card">
    <img src="${item.img}" alt="${item.name}" style="width: 100px; height: auto; border-radius: 8px;" />
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

  wishlistItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-wishlist")) {
      let wishlist = getWishlist();
      const index = event.target.dataset.index;
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlist();
    }
  });

  window.addEventListener("storage", updateWishlist);
  updateWishlist();
});
