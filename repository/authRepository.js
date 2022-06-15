const User = require('../src/models/user')
const jwt = require('jsonwebtoken')


const generateAuthAccessToken = async function (user) {
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    user.tokens = user.tokens.concat({ token });
  
    await user.save();
    console.log(token)
    return token;
  };

const generateAuthRefreshToken = async function (user) {
    const token = jwt.sign({ _id: user.id.toString() }, "refresh", {
      expiresIn: "7d",
    });
  
    user.tokens = user.tokens.concat({ token });
  
    await user.save();
    console.log(token)
    return token;
  };

  const renewTokens = async (req)=>{
    try {
      const decoded = jwt.verify(req.body.refreshToken, "refresh");
  
      const user = await User.findOne({ _id: decoded._id });
      if (!user) throw new Error();
      const accessToken = await generateAuthAccessToken(user);
      const refreshToken = await generateAuthRefreshToken(user);
      //logger remains
      return [201,{ accessToken, refreshToken }];
    } catch (error) {
      //logger remains
      return [401,{ error }];
    }
  }
  module.exports = {
    generateAuthAccessToken,
    generateAuthRefreshToken,
    renewTokens
  }