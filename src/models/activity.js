const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
	{
		ActivityName: {
			type: String,
			trim: true,
			required: true,
			require: true,
		},
		gpx: {
			metadata: {
				desc: String,
				country: String,
				isActive: Boolean,
			},
		},
		task: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Task",
		},
	},
	{
		timestamps: true,
	}
);

const activity = mongoose.model("Activity", activitySchema);

module.exports = activity;
