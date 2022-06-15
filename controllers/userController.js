const User = require("../src/models/user");
const multer = require("multer");
const sharp = require("sharp");
const logger = require("../logger");
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
    //Validation
    //no need for validation here because in postman environment is set.

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
    //Validation
    //no need for validation here because in postman environment is set.

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
    //Validation
    //no need for validation here because in postman environment is set.

    //Processing
    const result = await repo.readUsers(req.user);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
  //for read all users
  // try{
  //     const users = await User.find({})
  //     res.send(users)
  // } catch(e){
  //     res.status(500).send(e)
  // }
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
    //Validation
    //no need for validation here because in postman environment is set.

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
    //Validation
    // Not needed

    //Processing
    const result = await repo.deleteUser(req);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
};

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image!"));
    }

    cb(undefined, true);
  },
});

const uploadAvatar =
  (upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    logger.info(`Image uploaded by User: ${req.user._id}`);
    res.send();
  },
  (error, req, res, next) => {
    logger.error("Error occurred in image upload");
    res.status(400).send({ error: error.message });
  });

const deleteAvatar = async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    logger.info(`Image deleted from User: ${req.user._id}`);
    res.send();
  } catch (error) {
    logger.error("Error in image deletion.");
    res.status(400).send({ error: error.message });
  }
};

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    logger.info(`Image readed by User: ${user._id}`);
    res.send(user.avatar);
  } catch (error) {
    logger.error("Error occurred during image reading.");
    res.status(404).send({ error: error.message });
  }
};

module.exports = {
  deleteUser,
  createUser,
  userLogin,
  userLogout,
  allUserLogout,
  readUsers,
  uploadAvatar,
  deleteAvatar,
  getAvatar,
  updateUser,
  forgotPasswordUser,
  verifyPasswordUser,
};
