const jwt = require("jsonwebtoken");
const logger = require("../../logger");
const User = require("../models/user");
const Task = require("../models/tasks");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) throw new Error();
    req.user = user;

    const task = await Task.findById(req.query.task_id);
    req.task = task;

    // if (!task) throw new Error();

    logger.info("User Authenticated!");
    next();
  } catch (e) {
    logger.error("Issue occurred in user authentication!");
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
