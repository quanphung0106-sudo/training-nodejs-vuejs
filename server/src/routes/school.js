const express = require("express");
const router = express.Router();
const SchoolController = require("../app/controllers/SchoolController");

router.post("/", SchoolController.createSchool);
router.get("/", SchoolController.getAllSchools);
router.put("/:id", SchoolController.updateSchool);
router.delete("/", SchoolController.deleteAllSchools);
router.delete("/:id", SchoolController.deleteSchool);

module.exports = router;
