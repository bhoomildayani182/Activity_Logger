const express = require("express");
const auth = require("../src/middleware/auth");
const router = new express.Router();

const userController = require("../controllers/userController");

const use = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

//Create User
router.post("/users", use(userController.createUser));

//user login
router.post("/users/login", userController.userLogin);

//logout user
router.post("/users/logout", auth, userController.userLogout);

//logout all users
router.post("/users/logoutAll", auth, userController.allUserLogout);

//Read All Users / One user which is logged in
router.get("/users/me", auth, userController.readUsers);

//Updating Users
router.patch("/users/me", auth, userController.updateUser);

//forget password
router.post(
	"/users/me/forgetpassword",
	auth,
	userController.forgotPasswordUser
);

router.post("/user/me/verifyOtp", auth, userController.verifyPasswordUser);

//Deleting an User
router.delete("/users/me", auth, userController.deleteUser);

module.exports = router;
