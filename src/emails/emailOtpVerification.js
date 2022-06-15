const mongoose = require('mongoose')

const userOtpVerificationSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    otp: {
        type: String
    }, 
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
})


const userOtpVerification = mongoose.model('UserOtpVerification', userOtpVerificationSchema)

module.exports = userOtpVerification