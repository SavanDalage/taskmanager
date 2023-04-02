const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

//////////////////////////

const taskSchema = new mongoose.Schema(
  {
    description: {
      required: true,
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//////////////////////////

//////////////////////////

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
