const repo = require("../repository/activityRepository");
const helpers = require("../helpers/helpers");
const authSchema = require("../validators/activityValidator.js");

const createActivity = async (req, res) => {
	try {
		console.log("1");
		//Validation
		await authSchema.createActivity.validateAsync(req.body);
		console.log("2");

		//Processing
		const result = await repo.createActivity(req);
		console.log("3");

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const readActivities = async (req, res) => {
	try {
		//Validation
		await authSchema.readActivities.validateAsync(req.body);

		//Processing
		const result = await repo.readActivities(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const readActivityFromId = async (req, res) => {
	try {
		//Processing
		const result = await repo.readActivityFromId(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const updateActivity = async (req, res) => {
	try {
		//Validation
		await authSchema.updateActivity.validateAsync(req.body);

		//Processing
		const result = await repo.updateActivity(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const deleteActivity = async (req, res) => {
	try {
		//Processing
		const result = await repo.deleteActivity(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

module.exports = {
	createActivity,
	readActivities,
	readActivityFromId,
	updateActivity,
	deleteActivity,
};
