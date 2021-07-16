cors = require('cors');
const multer = require('multer');

function fileUpload(app) {
    app.use(cors()); // To allow requests from other server

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

}

module.exports = fileUpload;