const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  Name: String,
  Marks: Number,
  slug: {
    type: String,
    lowercase: true,
  },
});
const StudentModel = mongoose.model("Student", studentSchema);
module.exports = StudentModel;