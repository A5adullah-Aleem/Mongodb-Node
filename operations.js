const studentModel = require("./models/model");
const createstudent = async (Name, Marks) => {
  console.log("Create Product");
  let students = new studentModel();
  students.Name = Name;
  students.Marks = Marks;
  await students.save();
  return students;
};


const updateStudents = async (_id, Name, Marks) => {
  let students = await studentModel.findById(_id);
  students.Name = Name;
  students.Marks = Marks;
  await students.save();
  return students;
};


const getAllStudents = async () => {
  let students = await studentModel.find();
  return students;
};
const deletestudnts = async (_id) => {
  let students = await studentModel.findByIdAndDelete(_id);
  return students;
};
const getStudentById = async (_id) => {
  let students = await studentModel.findById(_id);
  return students;
};
module.exports.createstudent = createstudent;
module.exports.getAllStudent = getAllStudents;
module.exports.deleteStudent = deletestudnts;
module.exports.updateStudent = updateStudents;
module.exports.getStudentById = getStudentById;