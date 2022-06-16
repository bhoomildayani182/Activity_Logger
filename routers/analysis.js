const express = require("express");
const auth = require("../src/middleware/auth");
const router = new express.Router();
const analysisController = require("../controllers/analysisController");

router.post("/activity-count", auth, analysisController.activityCount);
router.post(
	"/activity-count-daily",
	auth,
	analysisController.activityCountDaily
);
router.post(
	"/activity-count-weekly",
	auth,
	analysisController.activityCountWeekly
);
router.post(
	"/activity-count-monthly",
	auth,
	analysisController.activityCountMonthly
);

module.exports = router;
