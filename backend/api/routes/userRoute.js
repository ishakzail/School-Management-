var express = require('express');
var cors = require('cors');
const users = express.Router()
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const User = require('../models/userModel')

users.use(cors());
process.env.SECRET_KEY = 'secret'

// API : POST for the register

users.post('/register' , (req , res ) => {
    const today = new Date()
    const userData = {
        fullName : req.body.fullName,
        email : req.body.email,
        password : req.body.password,
        valid : req.body.valid ,
        created_at : today
    }
    User.findOne({
        email : req.body.email
    })
    .then(user => {
        if(!user){
            bcryptjs.hash(req.body.password, 10, (err,hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({status : user.email + ' registred !'})
                })
                .catch(err => {
                    res.send('error' + err)
                })
            })
            
        }else{
            res.json({error : 'User already exists'})
        }
        
    })
    .catch(err => {
        res.send('error' +err)
    })
})

users.post('/login' ,(req , res) =>{
    User.findOne({
        email : req.body.email,
     valid :{ $exists: true}
    })
    .then(user =>  {
        if(user && user.valid==1) {
            if(bcryptjs.compareSync(req.body.password , user.password) ){
                const payload = {
                    id : user.id,
                    fullName : user.fullName,
                    email : user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn : 1440
                })
            res.send(token)
            }else{
                res.json({error : "User does'nt exists"})
            }
        }else{
            res.json({error : "User does not exists"})
        }
    })
    
})

users.get('/profile' ,(req , res) =>{
    var decoded = jwt.verify(req.headers['autorisation'] ,process.env.SECRET_KEY)
    User.findOne({
        id : decoded.id
    })
    .then(user =>{
        if(user){
            res.json(user)
        }else {
            res.send('User does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    })
})

users.put('/:userId' , (req, res) =>{
    Student.findOneAndUpdate({_id : req.params.studentId} , req.body ,  {new : true} , (err , std) =>{
        if(err)
        res.send(err)
        res.json(std)
    })
});

// get all user 

users.get('/Allusers' , (req , res) => {
    User.find({ valid :{ $exists: false}} , (err , user) => {
        if(err) 
        res.send(err)
        res.json(user)
    })

});


// update user 
users.put('/valid/:userId' , (req, res) =>{
   User.findOneAndUpdate({_id : req.params.userId} , req.body ,  {new : true} , (err , std) =>{
        if(err)
        res.send(err)
        res.json(std)
    })
});


module.exports = users ;