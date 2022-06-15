const joi = require("joi");

const createActivity = joi.object({
  ActivityName: joi.string(),

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

// exports.schema = validator(authSchema)
module.exports = {
  createActivity,
  readActivities,
  updateActivity,
};
