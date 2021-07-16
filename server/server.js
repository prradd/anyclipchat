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

const socket = require('./libs/socket');
const fileUpload = require('./libs/fileUpload');

socket(io);

fileUpload(app);

// To allow Get request to public folder
app.use(express.static(path.join(__dirname, 'public')));


http.listen(4000, () => {
    console.log('listening on port 4000');
})


