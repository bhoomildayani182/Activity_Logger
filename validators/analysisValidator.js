const joi = require("joi");

const activityCount = joi.object({
	ActivityName: joi.string().required(),
});

const activityCountDaily = joi.object({
	ActivityName: joi.string().required(),
});

const activityCountWeekly = joi.object({
	ActivityName: joi.string().required(),
});

const activityCountMonthly = joi.object({
	ActivityName: joi.string().required(),
});

module.exports = {
	activityCount,
	activityCountDaily,
	activityCountWeekly,
	activityCountMonthly,
};
