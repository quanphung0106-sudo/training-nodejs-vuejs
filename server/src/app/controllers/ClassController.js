const Class = require("../models/Class");
const School = require("../models/School");
const Student = require("../models/Student");

//create an class
//[POST]: /api/classes/
const createClass = async (req, res) => {
  try {
    const myClass = await Class.create(req.body);
    if (myClass) {
      const myClassId = myClass._id;

      await School.findOneAndUpdate(
        { _id: '63f4429583a17cf696f4301d' },
        { $addToSet: { classes: myClassId } },
        { new: true }
      );
  
    }
    return res.status(201).json(myClass);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateClass = async (req, res) => {
  try {
    const myClass = await Class.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(myClass);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addStudent = async (req, res) => {
  try {
    const currentStudent = await Student.findById({ _id: req.body.studentId });
    const getStudentId = currentStudent._id;
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { students: getStudentId } },
      { new: true }
    );
    return res.status(200).json(updatedClass);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAllClasses = async (req, res) => {
  try {
    const myClasses = await Class.find().populate({ path: "students" });
    return res.status(200).json(myClasses);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getClass = async (req, res) => {
  try {
    const myClass = await Class.findById({ _id: req.params.id }).populate(
      "students"
    );
    return res.status(200).json(myClass);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete all classes
//[DELETE]: /api/classes/
const deleteAllClasses = async (req, res) => {
  try {
    const myClasses = await Class.remove();
    return res.status(200).json("Deleted all my classes");
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete an class
//[DELETE]: /api/classes/:id
const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    return res.status(200).json("The class has been deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClass,
  updateClass,
  deleteAllClasses,
  deleteClass,
  addStudent,
};
