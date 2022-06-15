const nodemailer = require('nodemailer')
const logger = require('../../logger')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'uttambhavani2003@gmail.com',
        pass: 'Uttam1234@'
    }
})

const sendWelcomeEmail = (email, name)=>{
    transporter.sendMail({  
        from: 'uttambhavani2003@gmail.com',
        to: email,
        subject: 'Thanks for joining us!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
        },
    
        function(error, info){
            if(error) return console.log(error)
            // if(error) return logger.error('Error in Sending welcome email')
    })
    // logger.log(`Welcome email sent successfully to ${email}`)
}

const sendGoodbyeEmail = (email, name)=>{
    transporter.sendMail({  
        from: 'uttambhavani2003@gmail.com',
        to: email,
        subject: 'Sorry to see you go!',
        text: `GoodBye ${name}. I hope to see you back sometime soon`
        },
    
        function(error, info){
        if(error) console.log(error)
        // if(error) logger.error('Error in Sending goodbye email')
    })
    // logger.log(`Goodbye email sent successfully to ${email}`)
}

const sendVerificationEmail = (email, otp)=>{
    transporter.sendMail({  
        from: 'uttambhavani2003@gmail.com',
        to: email,
        subject: 'Verify your Email',
        text: `Your verification Code: ${otp}`
        },
    
        function(error, info){
        if(error) console.log(error)
        // if(error) logger.error('Error in Sending otp verification email')
        },
        // logger.log(`OTP verification email sent successfully to ${email}`)
    )
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail,
    sendVerificationEmail
}