const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

const users = [{ username: 'admin', password: '12345' }];

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

// Routes to serve the HTML files
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/create-employee', (req, res) => res.sendFile(path.join(__dirname, 'public', 'create-employee.html')));
app.get('/employee-list', (req, res) => res.sendFile(path.join(__dirname, 'public', 'employee-list.html')));

// Start the server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));