// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 5011;

// // Define the users array to store user data
// let users = [];

// // Serve static files
// app.use(express.static(__dirname)); // This serves all files from the root

// // Middlewares
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// // Serve index.html at the root URL
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Route to handle form submission
// app.post('/submit', (req, res) => {
//     console.log('Form Data Received:', req.body);

//     // Process your form data here
//     let user_id;
//     if (users.length === 0) {
//         user_id = 1;
//     } else {
//         user_id = users[users.length - 1].id + 1;
//     }

//     const new_user = {
//         id: user_id,
//         name: req.body.name,
//         email: req.body.email,
//         user: req.body.user,
//         phone: req.body.phone,
//         password: req.body.password
//     };

//     users.push(new_user);
//     console.log(users);

//     // After successful submission, redirect to main.html
//     res.redirect('/main.html');
// });

// // Serve main.html
// app.get('/main.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'main.html'));
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const publicDir = __dirname;

const userFilePath = path.join(publicDir, "data.txt");
const reviewFilePath = path.join(publicDir, "review.txt");
const wishlistFilePath = path.join(publicDir, "wishlist.txt");

// Create the text files if they don't exist
[userFilePath, reviewFilePath, wishlistFilePath].forEach((file) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

// Routes
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
    user: req.body.user,
    phone: req.body.phone,
    password: req.body.password,
  };

  const userString = JSON.stringify(new_user) + "\n";

  fs.appendFile(userFilePath, userString, (err) => {
    if (err) {
      console.error(" Error saving user:", err);
      return res.status(500).send("Failed to save user");
    }
    console.log("✅ User data saved");
    res.redirect("/main.html");
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
      console.error("❌ Error saving review:", err);
      return res.status(500).json({ message: "Error saving review" });
    }
    res.status(200).json({ message: "Review submitted successfully!" });
  });
});

// ✅ Wishlist route
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
      console.error("❌ Error saving wishlist item:", err);
      return res.status(500).json({ message: "Error saving wishlist item" });
    }
    res.status(200).json({ message: "Wishlist item added successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
