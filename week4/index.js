const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use((req, res, next) => {
    console.log(`Request received at ${new Date().toLocaleTimeString()} for ${req.url}`);
    next();
});

// Route 1: Home
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Route 2: About
app.get('/about', (req, res) => {
    res.send('This is the About Page!');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
