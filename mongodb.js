const { MongoClient } = require("mongodb");
const logger = require("./logger");

const connectionURL = "mongodb://127.0.0.1:27017";

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return logger.error("Unable to connect to database!");
		}
	}
);
