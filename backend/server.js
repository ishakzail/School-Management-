var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
const fs = require("fs");

var port = process.env.PORT || 4000;





app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended : false
    })
)
mongoose.Promise = global.Promise;
const mongoURI = 'mongodb+srv://ishak:ishak@cluster0-eqy4j.mongodb.net/test?retryWrites=true&w=majority';

mongoose
    .connect(mongoURI , {useNewUrlParser : true , useFindAndModify: false , useUnifiedTopology: true })
    .then(() => console.log('mongo db connected well !') )
    .catch(err => console.log(err))

var Users = require('./api/routes/userRoute')

app.use('/users' , Users)

var Students = require('./api/routes/studentRoute')
app.use('/students' , Students)

var Cours = require('./api/routes/courRoute')
 app.use('/cours' , Cours)


app.listen(port , () => {
    console.log('Server is running successfully on :' + port);
})

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


app.get("/pdf", (req, res) => {
    var file = fs.createReadStream("./uploads/marouanecv.pdf");
    file.pipe(res);
  });

app.get('/downloadPdf', (req, res) => res.download('./uploads/marouanecv.pdf'))