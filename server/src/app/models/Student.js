const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentTrainingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "ClassTraining"
    }
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.StudentTraining ||
  mongoose.model("StudentTraining", StudentTrainingSchema);
