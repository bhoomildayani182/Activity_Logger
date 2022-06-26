const joi = require("joi");

const createTask = joi.object({
	Description: joi.string(),

	Completed: joi.bool(),

	owner: joi.string().alphanum().length(24),
});

const loginTask = joi.object({
	token: joi.string().alphanum().required().length(20),
});

const readTasks = joi.object({
	owner: joi.string().alphanum().length(24),
});

const updateTask = joi.object({
	Description: joi.string(),

	Completed: joi.bool(),

	owner: joi.string().alphanum().length(24),
});

module.exports = {
	createTask,
	readTasks,
	updateTask,
	loginTask,
};
