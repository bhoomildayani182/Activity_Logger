const Task = require("../src/models/tasks");
const Activity = require("../src/models/activity");
const logger = require("../logger");

/// For activity

const createActivity = async (req) => {
	const token = req.query.token;
	if (!token) return [404, { error: "Please enter a token" }];

	const decoded = await Task.findOne({ token });
	if (!decoded) return [400, { error: "Please Provide a valid token" }];

	const activity = new Activity({
		...req.body,
		task: decoded._id,
	});

	try {
		await activity.save();
		const task = await Task.findById(decoded._id);
		console.log(decoded._id);
		req.task = task;
		logger.info(`Activity created for task: ${decoded._id}`);
		return [201, { activity }];
	} catch (error) {
		logger.error("Error occurred during activity creation");
		return [400, { error }];
	}
};

const readActivities = async (req) => {
	try {
		const token = req.query.token;
		console.log(token);
		if (!token) return [404, { error: "Please enter a token" }];

		const decoded = await Task.findOne({ token });
		if (!decoded) return [400, { error: "Activity not found" }];
		console.log(decoded);

		const activities = await Activity.find({ task: decoded._id });
		logger.info(`Activity readed from Task: ${decoded._id}`);
		return [200, activities];
	} catch (e) {
		logger.error("Error occurred during activity reading");
		return [500, e];
	}
};

const readActivityFromId = async (req) => {
	if (req.params.id.length !== 24)
		return res.status(400).send({ error: "Please Enter valid activity id" });

	const _id = req.params.id;
	try {
		const activity = await Activity.findById(_id);
		// const activity = await Activity.findOne({
		//   _id: req.params.id,
		//   // task : req.query.task_id,
		// });

		if (!activity) return [404, { error: "Activity not found" }];
		// const activity = await Activity.findOne({ _id, owner: req.task._id });
		console.log(activity);

		if (!activity) return res.status(404).send({ error: "Activity not found" });
		logger.info(`Activity readed for given task id: ${activity.task}`);
		return [200, activity];
	} catch (e) {
		logger.error("Error occurred in reading activity from given ID");
		return [500, e];
	}
};

const updateActivity = async (req) => {
	if (req.params.id.length !== 24)
		return [400, { error: "Please Enter valid activity id" }];
	const updates = Object.keys(req.body);
	const allowedUpdates = ["ActivityName"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) return [400, { error: "Invalid operations" }];
	try {
		const activity = await Activity.findOne({
			_id: req.params.id,
			// task : req.query.task_id,
		});

		if (!activity) return [404, { error: "Activity not found" }];

		updates.forEach((update) => (activity[update] = req.body[update]));
		await activity.save();
		logger.info(`Activity updated of Task: ${activity.task}`);
		return [200, { activity }];
	} catch (e) {
		logger.error("Error occurred in task updation");
		return [400, e];
	}
};

const deleteActivity = async (req) => {
	try {
		const activity = await Activity.findOneAndDelete({
			_id: req.params.id,
			// task : req.query.task_id,
		});

		if (!activity) return [404, { error: "Activity not found" }];
		logger.info(`Task deleted from User: ${activity.task}`);
		return [200, activity];
	} catch (e) {
		logger.error("Error occurred in task deletion");
		return [500, e];
	}
};

module.exports = {
	createActivity,
	readActivities,
	readActivityFromId,
	updateActivity,
	deleteActivity,
};
