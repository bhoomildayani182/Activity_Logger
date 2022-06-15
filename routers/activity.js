const express = require("express");
const auth = require("../src/middleware/auth");
const router = new express.Router();
const activityController = require("../controllers/activityController");

//create activity
router.post("/activity", auth, activityController.createActivity);

// //Read All Activity
router.get("/activity", auth, activityController.readActivities);

//Read an Task whom's id provided
router.get("/activity/:id", auth, activityController.readActivityFromId);

//Updating Activity
router.patch("/activity/:id", auth, activityController.updateActivity);

//Deleting an Task
router.delete("/activity/:id", auth, activityController.deleteActivity);

module.exports = router;
