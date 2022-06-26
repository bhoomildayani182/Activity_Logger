const User = require("../src/models/user");
const {
	sendWelcomeEmail,
	sendGoodbyeEmail,
	sendVerificationEmail,
} = require("../src/emails/account");
const logger = require("../logger");
const bcrypt = require("bcryptjs");
const userOtpVerification = require("../src/emails/emailOtpVerification");
const {
	generateAuthAccessToken,
	generateAuthRefreshToken,
} = require("./authRepository");

const createUser = async (data) => {
	const user = new User(data);

	try {
		await user.save();
		sendWelcomeEmail(user.email, user.name);
		const accessToken = await generateAuthAccessToken(user);
		const refreshToken = await generateAuthRefreshToken(user);
		logger.info("User Created");
		return [201, { user, accessToken, refreshToken }];
	} catch (e) {
		logger.error("Error during user creation!!");
		return [400, e];
	}
};

const loginUser = async (data) => {
	try {
		const user = await User.findByCredentials(data.email, data.password);

		const accessToken = await generateAuthAccessToken(user);
		const refreshToken = await generateAuthRefreshToken(user);
		logger.info(`User: ${user._id} logged in successfully!`);
		return [200, { user, accessToken, refreshToken }];
	} catch (e) {
		logger.error("Error during user logging");
		return [400, e];
	}
};

const logoutUser = async (req) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});

		await req.user.save();

		logger.info(`User: ${req.user._id} logged out successfully!`);
		return [200, "Success!"];
	} catch (e) {
		logger.error("Error in user logout.");
		return [500, e];
	}
};

const allUserLogout = async (req) => {
	try {
		req.user.tokens = [];
		await req.user.save();

		logger.info(`all users logged out successfully!`);
		return [200, "Success!"];
	} catch (e) {
		logger.error("Error in All users logout.");
		return [500, e];
	}
};

const readUsers = async (data) => {
	logger.info("User readed!");
	return [200, data];
};

const updateUser = async (req) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return [400, { error: "Invalid updates!" }];
	}

	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));

		await req.user.save();
		logger.info(`User: ${req.user._id} updated`);
		return [201, req.user];
	} catch (e) {
		logger.error("Error occurred in user updation.");
		return [400, e];
	}
};

const forgotPasswordUser = async (req) => {
	try {
		const sendOtpVerificationEmail = async (_id, email) => {
			try {
				const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

				const saltRounds = 10;

				const hashedOtp = await bcrypt.hash(otp, saltRounds);
				const newOtpVerification = await new userOtpVerification({
					userID: _id,
					otp: hashedOtp,
					createdAt: Date.now(),
					expiresAt: Date.now() + 300000,
				});

				//save the otp record
				await newOtpVerification.save();
				sendVerificationEmail(email, otp);
				return {
					status: "Pending",
					message: "Verification otp email sent",
					data: {
						userID: _id,
						email,
					},
				};
			} catch (error) {
				return {
					status: "FAILED!",
					message: error.message,
				};
			}
		};
		sendOtpVerificationEmail(req.user.id, req.user.email);
		logger.info(
			`Forgot password email sent successfully by User: ${req.user._id}`
		);
		return [200, { message: "Email sent!" }];
	} catch (error) {
		logger.error("Error occurred in forgot password");
		return [500, { error: error.message }];
	}
};

const verifyPasswordUser = async (req) => {
	try {
		const { userId, otp } = req.body;
		if (!userId || !otp) throw new Error("Empty otp details are not allowed");
		else {
			const userOtpVerificationRecords = await userOtpVerification.find({
				userId,
			});
			if (userOtpVerificationRecords.length <= 0) {
				throw new Error(
					"Account record dosen't exist or has been verified already, Please sign up to login."
				);
			} else {
				const { expiresAt } = userOtpVerificationRecords[0];
				const hashedOtp = userOtpVerificationRecords[0].otp;

				if (expiresAt < Date.now()) {
					await userOtpVerification.deleteMany({ userId });
					throw new Error("Code has expired. Please try again");
				} else {
					const validOtp = await bcrypt.compare(otp, hashedOtp);

					if (!validOtp) throw new Error("Invalid Code. Please Try again");
					else {
						await User.updateOne(
							{ _id: userId },
							{ password: await bcrypt.hash(req.body.password, 8) }
						);

						await userOtpVerification.deleteMany({ userId });
						logger.info(
							`User: ${req.user._id} has verified OTP and password updated successfully`
						);
						return [
							201,
							{
								status: "user updated",
								message: "user email verified",
							},
						];
					}
				}
			}
		}
	} catch (error) {
		logger.error("Error occurred during verifying OTP");
		return [500, { error: error.message }];
	}
};

const deleteUser = async (req) => {
	try {
		sendGoodbyeEmail(req.user.email, req.user.name);
		await req.user.remove();

		logger.info(`User: ${req.user._id} deleted`);
		return [200, req.user];
	} catch (e) {
		logger.error("Error occurred in user deletion");
		return [500, e];
	}
};

module.exports = {
	createUser,
	loginUser,
	logoutUser,
	allUserLogout,
	readUsers,
	updateUser,
	forgotPasswordUser,
	verifyPasswordUser,
	deleteUser,
};
