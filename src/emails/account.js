var nodeoutlook = require("nodejs-nodemailer-outlook");

const logger = require("../../logger");

const sendWelcomeEmail = (email, name) => {
	nodeoutlook.sendEmail({
		auth: {
			user: "uttambhavani007@outlook.com",
			pass: "UtTaM9727@$",
		},
		from: "uttambhavani007@outlook.com",
		to: email,
		subject: "Thanks for joining us!",
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
		onError: (e) => logger.error(e),
	});
};

const sendGoodbyeEmail = (email, name) => {
	nodeoutlook.sendEmail({
		auth: {
			user: "uttambhavani007@outlook.com",
			pass: "UtTaM9727@$",
		},
		from: "uttambhavani007@outlook.com",
		to: email,
		subject: "Sorry to see you go!",
		text: `GoodBye ${name}. I hope to see you back sometime soon`,
		onError: (e) => logger.error(e),
	});
};

const sendVerificationEmail = (email, otp) => {
	nodeoutlook.sendEmail({
		auth: {
			user: "uttambhavani007@outlook.com",
			pass: "UtTaM9727@$",
		},
		from: "uttambhavani007@outlook.com",
		to: email,
		subject: "Verify your Email",
		text: `Your verification Code: ${otp}`,
		onError: (e) => logger.error(e),
	});
};

module.exports = {
	sendWelcomeEmail,
	sendGoodbyeEmail,
	sendVerificationEmail,
};
