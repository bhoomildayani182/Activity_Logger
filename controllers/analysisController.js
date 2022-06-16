const helpers = require("../helpers/helpers");
const repo = require("../repository/analysisRepository");
const authSchema = require("../validators/analysisValidator.js");

const activityCount = async (req, res) => {
	try {
		//Validation
		await authSchema.activityCount.validateAsync(req.body);
		//Processing
		const result = await repo.activityCount(req);
		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const activityCountDaily = async (req, res) => {
	try {
		//Validation
		await authSchema.activityCountDaily.validateAsync(req.body);
		//Processing
		const result = await repo.activityCountDaily(req);
		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const activityCountWeekly = async (req, res) => {
	try {
		//Validation
		await authSchema.activityCountWeekly.validateAsync(req.body);
		//Processing
		const result = await repo.activityCountWeekly(req);
		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const activityCountMonthly = async (req, res) => {
	try {
		//Validation
		console.log("1");
		await authSchema.activityCountMonthly.validateAsync(req.body);
		//Processing
		console.log(req.body);
		const result = await repo.activityCountMonthly(req);
		console.log("2");
		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

module.exports = {
	activityCount,
	activityCountDaily,
	activityCountWeekly,
	activityCountMonthly,
};
