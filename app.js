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
const dirpath = path.join(__dirname);
const app = express();
const publicDir = __dirname;
const filePath = path.join(__dirname, "data.txt");
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Needed for form data

app.get("/index", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
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
  if (fs.existsSync(filePath)) {
    fs.appendFile(filePath, userString, (err) => {
      if (!err) {
        console.log("File updated");
        res.redirect("/main.html");
      }
    });
  } else {
    fs.writeFileSync(dirpath + "/data.txt", userString);
    res.redirect("/main.html");
  }
});
app.use(express.static(publicDir)); // Serves static files (HTML, CSS, JS)

app.listen(3000);
