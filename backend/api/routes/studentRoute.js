var express = require('express');
var cors = require('cors');
var multer = require('multer');


const students = express.Router()
'use strict';


const Student = require('../models/studentModel')

// pour stocker les fichiers
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
  })
  
  
  
  var upload = multer({ storage: storage }).array('file')
// fin fichier
  
students.use(cors());


// API : POST for adding student

students.post('/addStudent' , (req , res ) => {
    // const today = new Date()
    
    Student.findOne({
        cne : req.body.cne
    })
    .then(student => {
        if(!student){
            const newStudent = new Student({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                cne : req.body.cne,
                filiere : req.body.filiere
                });
                Student.create(newStudent);
            res.json({message : 'Student created'})
        
        }else{
            res.json({error : 'students already exists'})
        }
    
    });
    
});

students.get('/Allstudents' , (req , res) => {
    Student.find({} , (err , std) => {
        if(err) 
        res.send(err)
        res.json(std)
    })

});

students.get('/:studentId' , (req , res) => {
    Student.findById(req.params.studentId ,  (err , std) =>{
        if (err) 
        res.send(err)
        res.json(std)
    })
});

students.put('/:studentId' , (req, res) =>{
    Student.findOneAndUpdate({_id : req.params.studentId} , req.body ,  {new : true} , (err , std) =>{
        if(err)
        res.send(err)
        res.json(std)
    })
});

students.delete('/:studentId' , (req , res) => {
    Student.findOneAndDelete({_id : req.params.studentId} , (err , std) =>{
        if(err)
        res.send(err)
        res.json({message :'  Student has been deleted'})
    })
})


//     StudentData.save(function (err) {
//         if(err) res.json(err)
//         res.json({
//             message : 'new student',
//             data : 'student'
//         })
//     })
// }

// Api pour ajouter files
students.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
  
    })
  
  });


module.exports = students ;