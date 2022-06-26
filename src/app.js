const express = require("express");
require("./db/mongoose");
require("mongoose");
const userRouter = require("../routers/user");
const taskRouter = require("../routers/task");
const activityRouter = require("../routers/activity");
const authRouter = require("../routers/auth");
const analysisRouter = require("../routers/analysis");
const helpers = require("../helpers/helpers");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(activityRouter);
app.use(authRouter);
app.use(analysisRouter);

app.use(function (err, req, res, next) {
	console.log(err);
	helpers.errorResponse(500, { message: "something went wrong" }, res);
});

module.exports = app;
