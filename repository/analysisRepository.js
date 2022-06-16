const Activity = require("../src/models/activity");

const activityCount = async (req) => {
	try {
		const activity = await Activity.find({
			ActivityName: req.body.ActivityName,
		});

		if (!activity) return [404, { error: "Activity Not Found" }];

		return [200, { "Number of activities": Object.keys(activity).length }];
	} catch (e) {
		logger.error("Error occurred during activity counting");
		return [500, e];
	}
};

const activityCountDaily = async (req) => {
	try {
		const activity = await Activity.find({
			ActivityName: req.body.ActivityName,
		});

		if (!activity) return [404, { error: "Activity Not Found" }];

		var date = new Date().setHours(0, 0, 0, 0);

		for (var i = 0; activity[i] !== undefined; i++) {
			var creDate = activity[i].createdAt.setHours(0, 0, 0, 0);
			if (creDate !== date) {
				delete activity[i];
			}
		}

		return [200, { "Number of activities": Object.keys(activity).length }];
	} catch (e) {
		logger.error("Error occurred during activity counting");
		return [500, e];
	}
};

const activityCountWeekly = async (req) => {
	try {
		const ActivityName = req.body.ActivityName;
		const activity = await Activity.find({ ActivityName });

		if (!activity) return [404, { error: "Activity Not Found" }];

		var date = new Date();
		date.setUTCDate(new Date().getDate() - 6);
		date.setHours(0, 0, 0, 0);

		for (var i = 0; activity[i] !== undefined; i++) {
			var creDate = activity[i].createdAt.setHours(0, 0, 0, 0);
			if (creDate <= date) {
				delete activity[i];
			}
		}

		return [200, { "Number of activities": Object.keys(activity).length }];
	} catch (e) {
		logger.error("Error occurred during activity counting");
		return [500, e];
	}
};

const activityCountMonthly = async (req) => {
	try {
		const ActivityName = req.body.ActivityName;
		const activity = await Activity.find({ ActivityName });

		if (!activity) return [404, { error: "Activity Not Found" }];

		const date1 = new Date(new Date().getFullYear(), new Date().getMonth(), 01);
		const date2 = new Date(
			new Date().getFullYear(),
			new Date().getMonth() - 1,
			01
		);

		for (var i = 0; activity[i] !== undefined; i++) {
			var creDate = activity[i].createdAt.setHours(0, 0, 0, 0);
			if (creDate > date1 || creDate <= date2) {
				delete activity[i];
			}
		}

		return [200, { "Number of activities": Object.keys(activity).length }];
	} catch (e) {
		logger.error("Error occurred during activity counting");
		return [500, e];
	}
};

module.exports = {
	activityCount,
	activityCountDaily,
	activityCountMonthly,
	activityCountWeekly,
};
