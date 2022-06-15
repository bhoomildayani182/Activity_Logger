const repo = require("../repository/taskRepository");
const helpers = require("../helpers/helpers");
const authSchema = require("../validators/taskValidator.js");

const createTask = async (req, res) => {
  try {
    //Validation
    await authSchema.createTask.validateAsync(req.body);

    //Processing
    const result = await repo.createTask(req);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
};

//Read All Tasks
// GET / tasks?completed=true
//GET /tasks?limit=10&skip=0
// GET tasks/sortBy=createdAt:desc
const readTasks = async (req, res) => {
  try {
    //Validation
    await authSchema.readTasks.validateAsync(req.body);

    //Processing
    const result = await repo.readTasks(req);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
};

const readTaskFromId = async (req, res) => {
  try {
    //Validation
    //Not Needed

    //Processing
    const result = await repo.readTask(req);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
};

const updateTask = async (req, res) => {
  try {
    //Validation
    await authSchema.updateTask.validateAsync(req.body);

    //Processing
    const result = await repo.updateTask(req);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
};

const deleteTask = async (req, res) => {
  try {
    //Validation
    // Not Needed

    //Processing
    const result = await repo.deleteTask(req);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
};

module.exports = {
  createTask,
  readTasks,
  readTaskFromId,
  updateTask,
  deleteTask,
};
