const Student = require("../models/Student");
const Class = require("../models/Class");

//create an student
//[POST]: /api/item/
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    if (student) {
      const studentId = student._id;
      await Class.findOneAndUpdate(
        { _id: student.class },
        { $push: { students: studentId } }
      );
    }
    return res.status(201).json(student);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateStudent = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      class: req.body.class._id,
    };

    const myStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    ).populate({ path: "class" });

    //Remove student from old class
    const oldClass = await Class.findByIdAndUpdate(myStudent.class._id, {
      $pull: { students: myStudent._id },
    });

    // Add student to new class
    const newClass = await Class.findByIdAndUpdate(req.body.class, {
      $push: { students: myStudent._id },
    });

    console.log({ oldClass, body: req.body });

    return res.status(200).json(myStudent);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all students
//[GET]: /api/item/
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate({ path: "class" });
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getStudent = async (req, res) => {
  try {
    const students = await Student.findById({ _id: req.params.id }).populate({
      path: "class",
    });
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete all students
//[DELETE]: /api/students/
const deleteAllStudents = async (req, res) => {
  try {
    const myStudent = await Student.findById({ _id: req.params.id }).populate(
      "class"
    );
    return res.status(200).json(myStudent);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete an student
//[DELETE]: /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    return res.status(200).json("The student has been deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteAllStudents,
  deleteStudent,
};
