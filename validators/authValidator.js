const joi = require("joi");

const renewTokens = joi.object({
  accessToken: joi.string(),

  refreshToken: joi.string(),
});



module.exports = {
  renewTokens,
};
