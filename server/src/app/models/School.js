const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolTrainingSchema = new Schema(
  {
    nameSchool: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "ClassTraining",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.SchoolTraining ||
  mongoose.model("SchoolTraining", SchoolTrainingSchema);
