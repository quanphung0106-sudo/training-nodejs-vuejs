const express = require("express");
const router = express.Router();
const StudentController = require("../app/controllers/StudentController");

router.post("/", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudent);
router.put("/:id", StudentController.updateStudent);
router.delete("/", StudentController.deleteAllStudents);
router.delete("/:id", StudentController.deleteStudent);

module.exports = router;
