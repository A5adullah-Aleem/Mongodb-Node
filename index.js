const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const {
    createstudent,
    getAllStudent,
    deleteStudent,
    updateStudent,
    getStudentById,
} = require("./operations");
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(async () => {
    console.log("Connection to MongoDB created");
  })
  .catch((err) => {
    console.log("Error Connecting");
    console.log(err);
  });


app.post("/students", async (req, res) => {
  try {
    const { Name, Marks } = req.body;
    const newStudent = await createstudent(Name, Marks);
    res.json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/students", async (req, res) => {
  try {
    const allStudents = await getAllStudent();
    res.json(allStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentById(id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Marks } = req.body;
    const updatedStudent = await updateStudent(id, Name, Marks);
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await deleteStudent(id);
    res.json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});