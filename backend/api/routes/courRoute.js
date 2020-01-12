let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase();
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // if (file.mimetype == "file/pdf" ) {
            cb(null, true);
        // } else {
        //     cb(null, false);
        //     return cb(new Error('Only .pdf format allowed!'));
        // }
    }
});

// User model
let Cour = require('../models/courModel');

router.post('/addCour', upload.single('courFile'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const cour = new Cour({
        courFiliere : req.body.courFiliere,
        courName: req.body.courName,
        courFile: url + '/uploads/' + req.file.filename
    });
    cour.save().then(result => {
        res.status(201).json({
            message: "cour registered successfully!",
            courCreated: {

                _id: result._id,
                courName : result.courName,
                courFile: result.courFile,
                courFiliere : result.courFiliere
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/All", (req, res, next) => {
    Cour.find().then(data => {
        res.status(200).json({
            message: "Courr list retrieved successfully!",
            cours: data
        });
    });
});

module.exports = router;

// cours.post('/addCour', async (req, res) => {
//     try {
//         if(!req.files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//             let pdf = req.files.pdf;
            
//             //Use the mv() method to place the file in upload directory (i.e. "uploads")
//             pdf.mv('./uploads/' + pdf.name);

//             //send response
//             res.send({
//                 status: true,
//                 message: 'File is uploaded',
//                 data: {
//                     name: pdf.name,
//                     mimetype: pdf.mimetype,
//                     size: pdf.size
//                 }
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });
// app.use(morgan('dev'));