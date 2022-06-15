const mongoose = require("mongoose");
const Activity = require("./activity");

const taskSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
      trim: true,
      required: true,
    },
    Completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.virtual("activity", {
  ref: "Activity",
  localField: "_id",
  foreignField: "task",
});

//Delete task activity when task is removed
taskSchema.pre("remove", async function (next) {
  const task = this;
  await Activity.deleteMany({ task: task._id });
  next();
});

const tasks = mongoose.model("Task", taskSchema);

module.exports = tasks;
