const School = require("../models/School");

//create an school
//[POST]: /api/item/
const createSchool = async (req, res) => {
  try {
    const mySchool = await School.create(req.body);
    return res.status(201).json(mySchool);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all schools
//[GET]: /api/item/
const getAllSchools = async (req, res) => {
  try {
    const mySchools = await School.find().populate({
      path: "classes",
    });
    return res.status(200).json(mySchools);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateSchool = async (req, res) => {
  try {
    const mySchool = await School.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    ).populate({ path: "classes" });
    return res.status(200).json(mySchool);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete all schools
//[DELETE]: /api/schools/
const deleteAllSchools = async (req, res) => {
  try {
    const mySchools = await School.remove();
    return res.status(200).json("Deleted all my schools");
  } catch (err) {
    return res.status(500).json(err);
  }
};

//delete an school
//[DELETE]: /api/schools/:id
const deleteSchool = async (req, res) => {
  try {
    await School.findByIdAndDelete(req.params.id);
    return res.status(200).json("The account has been deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createSchool,
  getAllSchools,
  updateSchool,
  deleteAllSchools,
  deleteSchool,
};
