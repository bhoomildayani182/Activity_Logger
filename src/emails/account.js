// const sgMail = require('@sendgrid/mail')

// const sendGridAPIKey = 'UGk2OaL0dRuHlLBDkvlS'

// sgMail.setApiKey(sendGridAPIKey)

// // sgMail.send({
// //     to: 'uttambhavani007@gmail.com',
// //     from: 'stockofuttam@gmail.com',
// //     subject: 'This is mt First creation',
// //     text: 'I hope this one actually get to you.'
// // })

// const sendWelcomeEmail = (email, name)=>{
//     sgMail.send({
//         to: email,
//         from: 'uttambhavani007@gmail.com',
//         subject: 'Thanks for joining us!',
//         text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
//     })
// }

// const sendGoodbyeEmail = (email, name)=>{
//     sgMail.send({
//         to: email,
//         from: 'uttambhavani007@gmail.com',
//         subject: 'Sorry to see you go!',
//         text: `GoodBye ${name}. I hope to see you back sometime soon`
//     })
// }

// module.exports = {
//     sendWelcomeEmail,
//     sendGoodbyeEmail
// }

const nodemailer = require('nodemailer')

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

const welcomeSend = {  
    from: 'uttambhavani2003@gmail.com',
    to: 'uttambhavani007@gmail.com',
    subject: 'This is mt First creation',
    text: 'I hope this one actually get to you.'
}
const goodbyeSend = {  
    from: 'uttambhavani2003@gmail.com',
    to: 'uttambhavani007@gmail.com',
    subject: 'This is mt First creation',
    text: 'I hope this one actually get to you.'
}

// transporter.sendMail({  
//     from: 'uttambhavani2003@gmail.com',
//     to: 'uttambhavani007@gmail.com',
//     subject: 'This is mt First creation',
//     text: 'I hope this one actually get to you.'
//     },

//     function(error, info){
//     if(error) return console.log(error)

//     console.log('Sent: ' + info.response)
// })

const sendWelcomeEmail = (email, name)=>{
    transporter.sendMail({  
        from: 'uttambhavani2003@gmail.com',
        to: email,
        subject: 'Thanks for joining us!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
        },
    
        function(error, info){
        if(error) return console.log(error)
    
        // console.log('Sent: ' + info.response)
    })
}

const sendGoodbyeEmail = (email, name)=>{
    transporter.sendMail({  
        from: 'uttambhavani2003@gmail.com',
        to: email,
        subject: 'Sorry to see you go!',
        text: `GoodBye ${name}. I hope to see you back sometime soon`
        },
    
        function(error, info){
        if(error) return console.log(error)
    
        // console.log('Sent: ' + info.response)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}