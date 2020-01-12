const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  valid : {
    type : Number ,
    required : false
  },
  Created_at: {
    type: Date,
    default: Date.now
  }
});


const EtudiantShema = new Schema({

 
  nom :{
    type: String,
    required: true

  },

  prenom : { type: String,
  required: true },

  cne : {
    type: String,
    required: true
    },
   
  filliere: {
    type: String,
    required: true

  },

 

})


module.exports = Etudiant = mongoose.model("etudiants",EtudiantShema);
module.exports = User = mongoose.model("users", UserSchema);