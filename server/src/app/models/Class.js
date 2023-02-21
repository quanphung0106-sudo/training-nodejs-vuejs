const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassTrainingSchema = new Schema(
  {
    nameClass: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "StudentTraining",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.ClassTraining ||
  mongoose.model("ClassTraining", ClassTrainingSchema);
