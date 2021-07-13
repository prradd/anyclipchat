const app = require('express')();
const fileUpload = require('express-fileupload');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET"]
    }
});

const socket = require('./libs/socket');

socket(io);

app.use(fileUpload({}));

// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    const r = (Math.random()).toString().substr(2)
    const newFileName = file.name.replace(/\.([a-zA-Z0-9]*)$/, `_${r}.$1`);

    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        file.mv(`${__dirname}/client/public/uploads/${newFileName}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.json({ fileName: newFileName, filePath: `/uploads/${newFileName}` });
        });
    } else {
        return res.status(400).json({ msg: 'Only Jpg/Jpeg and png files allowed' });
    }
});

http.listen(4000, () => {
    console.log('listening on port 4000');
})


