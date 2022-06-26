const joi = require("joi");

const createActivity = joi.object({
	ActivityName: joi.string(),

	gpx: joi.object(),

	task: joi.string().alphanum().length(24),
});

const readActivities = joi.object({
	ActivityName: joi.string(),

	task: joi.string().alphanum().length(24),
});

const updateActivity = joi.object({
	ActivityName: joi.string(),

	task: joi.string().alphanum().length(24),
});

module.exports = {
	createActivity,
	readActivities,
	updateActivity,
};
