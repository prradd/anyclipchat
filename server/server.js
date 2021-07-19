const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET"]
    }
});
const path = require('path');
require('dotenv').config();


// Database
const db = require('./config/database');
db.authenticate().then(() => console.log('Connection to DB has been established successfully.'));

// Socket
const socket = require('./libs/socket');
const fileUpload = require('./libs/fileUpload');

socket(io);

fileUpload(app);

// To allow Get request to public folder
// app.use(express.static(path.join(__dirname, 'public')));
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/public')));
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})


