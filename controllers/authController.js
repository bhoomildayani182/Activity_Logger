const repo = require('../repository/authRepository')
const helpers = require('../helpers/helpers')
const authSchema = require('../validators/authValidator')

const renewTokens = async (req, res) => {
    try{
        //validation
    await authSchema.renewTokens.validateAsync(req.body);

    //Processing
    const result = await repo.renewTokens(req);

    // Sending Response
    helpers.successResponse(result[0], result[1], res);
  } catch (error) {
    helpers.errorResponse(403, error.details[0].message, res);
  }
  }

module.exports = {
    renewTokens
}