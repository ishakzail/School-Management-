const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  cne: {
    type: String,
    required: true
  },
  filiere : {
      type : String , 
      required : true
  }

  
});
module.exports = Student = mongoose.model("students", StudentSchema);