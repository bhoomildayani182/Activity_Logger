const Task = require("../src/models/tasks");
const logger = require("../logger");

/// For tasks

const createTask = async (req) => {
  function makeToken(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    const token = makeToken(20);
    task.token = token;
    await task.save();
    logger.info(`Task cerated by User: ${req.user._id}`);
    return [201, task];
  } catch (e) {
    logger.error("Error occurred during task creation");
    return [400, e];
  }
};

const readTasks = async (req) => {
  const match = {};
  const sort = {};

  if (req.query.Completed) {
    match.Completed = req.query.Completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // const task = await Task.find({owner: req.user.id})
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    logger.info(`Task readed from User: ${req.user._id}`);
    console.log(req.user.tasks);
    return [200, req.user.tasks];
  } catch (e) {
    logger.error("Error occurred during task reading");
    return [500, e];
  }
};

const readTask = async (req) => {
  if (req.params.id.length !== 24)
    return res.status(400).send({ error: "Please Enter valid task id" });

  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send({ error: "Task not found" });
    logger.info(`Task readed for given user id: ${req.user._id}`);
    return [200, task];
  } catch (e) {
    logger.error("Error occurred in reading task from given ID");
    return [500, e];
  }
};

const updateTask = async (req) => {
  if (req.params.id.length !== 24)
    return [400, { error: "Please Enter valid task id" }];
  const updates = Object.keys(req.body);
  const allowedUpdates = ["Description", "Completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) return [400, { error: "Invalid operations" }];
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return [404, { error: "Task not found" }];

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    logger.info(`Task updated in User: ${req.user._id}`);
    return [200, { task }];
  } catch (e) {
    logger.error("Error occurred in task updation");
    return [400, e];
  }
};

const deleteTask = async (req) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    await task.remove();

    if (!task) return [404, { error: "Task not found" }];
    logger.info(`Task deleted from User: ${req.user._id}`);
    return [200, task];
  } catch (e) {
    logger.error("Error occurred in task deletion");
    return [500, e];
  }
};

module.exports = {
  createTask,
  readTasks,
  readTask,
  updateTask,
  deleteTask,
};
