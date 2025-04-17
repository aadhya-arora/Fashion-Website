const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const publicDir = __dirname;

const userFilePath = path.join(publicDir, "data.txt");
const reviewFilePath = path.join(publicDir, "review.txt");
const wishlistFilePath = path.join(publicDir, "wishlist.txt");

[userFilePath, reviewFilePath, wishlistFilePath].forEach((file) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/review", (req, res) => {
  res.sendFile(path.join(publicDir, "review.html"));
});

app.post("/submit", (req, res) => {
  const new_user = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    sign_as: req.body.sign_as,
  };

  const userString = JSON.stringify(new_user) + "\n";

  fs.appendFile(userFilePath, userString, (err) => {
    if (err) {
      console.error(" Error saving user:", err);
      return res.status(500).json({ message: "Failed to save user" });
    }

    console.log(" User data saved to data.txt");

    let redirectPage = "/main.html";
    if (new_user.sign_as === "admin") redirectPage = "/admin.html";
    else if (new_user.sign_as === "delivery") redirectPage = "/delivery.html";

    res
      .status(200)
      .json({ message: "Signup successful!", redirect: redirectPage });
  });
});

app.post("/submit-review", (req, res) => {
  const newReview = {
    fullname: req.body.fullname,
    review: req.body.review,
    improvement: req.body.improvement,
    rating: req.body.rating,
  };

  const reviewString = JSON.stringify(newReview) + "\n";

  fs.appendFile(reviewFilePath, reviewString, (err) => {
    if (err) {
      console.error(" Error saving review:", err);
      return res.status(500).json({ message: "Error saving review" });
    }
    res.status(200).json({ message: "Review submitted successfully!" });
  });
});

app.post("/add-to-wishlist", (req, res) => {
  const wishlistItem = {
    user: req.body.user,
    itemId: req.body.itemId,
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemImage: req.body.itemImage,
  };

  const wishlistString = JSON.stringify(wishlistItem) + "\n";

  fs.appendFile(wishlistFilePath, wishlistString, (err) => {
    if (err) {
      console.error(" Error saving wishlist item:", err);
      return res.status(500).json({ message: "Error saving wishlist item" });
    }
    res.status(200).json({ message: "Wishlist item added successfully!" });
  });
});

const addressFilePath = path.join(publicDir, "address.txt");

if (!fs.existsSync(addressFilePath)) fs.writeFileSync(addressFilePath, "");
app.post("/submit-address", (req, res) => {
  const newAddress = {
    name: req.body.name,
    mobile: req.body.mobile,
    house: req.body.house,
    area: req.body.area,
    landmark: req.body.landmark,
    city: req.body.city,
    pin: req.body.pin,
    state: req.body.state,
  };

  const addressString = JSON.stringify(newAddress) + "\n";

  fs.appendFile(addressFilePath, addressString, (err) => {
    if (err) {
      console.error("Error saving address:", err);
      return res.status(500).json({ message: "Failed to save address" });
    }
    console.log("Address saved");
    res.status(200).json({ message: "Address saved successfully" });
  });
});

const ordersFilePath = path.join(publicDir, "orders.txt");
if (!fs.existsSync(ordersFilePath)) fs.writeFileSync(ordersFilePath, "");

app.post("/place-order", (req, res) => {
  const { items, total, paymentMethod } = req.body;

  if (!items || !total || !paymentMethod) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const orderEntry = {
    items,
    total,
    paymentMethod,
    timestamp: new Date().toISOString(),
  };

  const orderString = JSON.stringify(orderEntry) + "\n";

  fs.appendFile(ordersFilePath, orderString, (err) => {
    if (err) {
      console.error("Error saving order:", err);
      return res.status(500).json({ message: "Failed to save order" });
    }
    res.status(200).json({ message: "Order placed successfully!" });
  });
});

app.get("/orders-data", (req, res) => {
  const addressData = fs
    .readFileSync(addressFilePath, "utf-8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  const orderData = fs
    .readFileSync(ordersFilePath, "utf-8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  res.json({ addresses: addressData, orders: orderData });
});

app.get("/users", (req, res) => {
  fs.readFile(userFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to read user file:", err);
      return res.status(500).json({ message: "Failed to load users" });
    }

    const users = data
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));

    res.json(users);
  });
});

app.get("/reviews", (req, res) => {
  fs.readFile(reviewFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to read review file:", err);
      return res.status(500).json({ message: "Failed to load reviews" });
    }

    const reviews = data
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));

    res.json(reviews);
  });
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
