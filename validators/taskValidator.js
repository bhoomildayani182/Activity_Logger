const joi = require("joi");

const createTask = joi.object({
  Description: joi.string(),

  Completed: joi.bool(),

  owner: joi.string().alphanum().length(24),
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
};
