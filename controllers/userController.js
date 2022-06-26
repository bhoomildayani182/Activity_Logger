const repo = require("../repository/userRepository");
const helpers = require("../helpers/helpers");
const authSchema = require("../validators/userValidator.js");

const createUser = async (req, res) => {
	try {
		//Validation
		await authSchema.createUser.validateAsync(req.body);

		//Processing
		const result = await repo.createUser(req.body);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const userLogin = async (req, res) => {
	try {
		//Validation
		await authSchema.loginUser.validateAsync(req.body);

		//Processing
		const result = await repo.loginUser(req.body);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const userLogout = async (req, res) => {
	try {
		//Processing
		const result = await repo.logoutUser(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const allUserLogout = async (req, res) => {
	try {
		//Processing
		const result = await repo.allUserLogout(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const readUsers = async (req, res) => {
	//validation
	try {
		//Processing
		const result = await repo.readUsers(req.user);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const updateUser = async (req, res) => {
	try {
		//validation
		await authSchema.updateUser.validateAsync(req.body);

		//Processing
		const result = await repo.updateUser(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const forgotPasswordUser = async (req, res) => {
	//validation
	try {
		//Processing
		const result = await repo.forgotPasswordUser(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const verifyPasswordUser = async (req, res) => {
	try {
		//validation
		await authSchema.verifyPasswordUser.validateAsync(req.body);

		//Processing
		const result = await repo.verifyPasswordUser(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

const deleteUser = async (req, res) => {
	try {
		//Processing
		const result = await repo.deleteUser(req);

		// Sending Response
		helpers.successResponse(result[0], result[1], res);
	} catch (error) {
		helpers.errorResponse(403, error.details[0].message, res);
	}
};

module.exports = {
	deleteUser,
	createUser,
	userLogin,
	userLogout,
	allUserLogout,
	readUsers,
	updateUser,
	forgotPasswordUser,
	verifyPasswordUser,
};
