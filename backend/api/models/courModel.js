const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourSchema = new Schema({
    courFile: { type: String },
    courName :{ type : String},
    courFiliere : { type : String }

}, {
    collection: 'cours'
})

module.exports = mongoose.model('Cour', CourSchema)