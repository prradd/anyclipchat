const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET"]
    }
});
cors = require('cors');
const multer = require('multer');
const path = require('path');

const socket = require('./libs/socket');

socket(io);

app.use(cors()); // To allow requests from other server

// To allow Get request to public folder
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage}).single('file');

// Upload Endpoint
app.post('/upload',(req, res) => {

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })

});

http.listen(4000, () => {
    console.log('listening on port 4000');
})


