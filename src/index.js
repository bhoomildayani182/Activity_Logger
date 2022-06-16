const app = require("./app");
const port = process.env.PORT;

app.listen(port, () => {
	console.log("Server is running up on port " + port);
});

//changes from others-changes

// //multer
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a word document'))
//         }

//         cb(undefined, true)

//         // cb(new Error('file must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)

//     }
// })

// // const errorMiddleware = (req, res, nex) => {
// //     throw new Error('From my middleware')
// // }
// app.post('/upload',upload.single('upload') , (req, res)=>{
//     res.send()
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })

//block GET request
// app.use((req, res, next)=>{
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

//block all the requests
// app.use((req, res, next)=>{
//     if(req.method){
//         res.status(503).send('Server is under maintenance :( please try back soon')
//     } else {
//         next()
//     }
// })

// const main = async ()=>{
//     // const task = await Task.findById('62911779c4474c0ae76558cb')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById('62910f8d08940e41d7755964')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()
// //toJSON function working
// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))
// //some work with jsonwebtoken
// const jwt = require('jsonwebtoken')

// const myFunction = async ()=>{
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismycourse', { expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismycourse')
//     console.log(data)

// }

// myFunction()

// const bcrypt = require('bcryptjs')

// const myFunction = async() => {
//     const password = '12345red'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('12345red', hashedPassword)

// }

// myFunction()
