const express = require("express");
const router = express.Router();
const ClassController = require("../app/controllers/ClassController");

router.post("/", ClassController.createClass);
router.post("/add-student/:id", ClassController.addStudent);
router.get("/", ClassController.getAllClasses);
router.get("/:id", ClassController.getClass);
router.put("/:id", ClassController.updateClass);
router.delete("/", ClassController.deleteAllClasses);
router.delete("/:id", ClassController.deleteClass);

module.exports = router;
