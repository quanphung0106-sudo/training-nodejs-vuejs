const StudentRouter = require("./students");
const ClassRouter = require("./classes");
const SchoolRouter = require("./school");

function route(app) {
  app.use("/api/students", StudentRouter);
  app.use("/api/classes", ClassRouter);
  app.use("/api/school", SchoolRouter);
}

module.exports = route;
