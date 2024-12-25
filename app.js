const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5050;

// Define the users array to store user data
let users = [];

// Serve static files
app.use(express.static(__dirname)); // This serves all files from the root

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    console.log('Form Data Received:', req.body);

    // Process your form data here
    let user_id;
    if (users.length === 0) {
        user_id = 1;
    } else {
        user_id = users[users.length - 1].id + 1;
    }

    const new_user = {
        id: user_id,
        name: req.body.name,
        email: req.body.email,
        user: req.body.user,
        phone: req.body.phone,
        password: req.body.password
    };

    users.push(new_user);
    console.log(users); 
    
    // After successful submission, redirect to main.html
    res.redirect('/main.html');
});

// Serve main.html
app.get('/main.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
