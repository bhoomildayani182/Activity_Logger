const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    Description: {
        type: String,
        trim: true,
        required: true
    }, 
    Completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true
})

const tasks = mongoose.model('Task', taskSchema)

// const data = new tasks({
//     Description: 'Got to the marcket',
// })

// data.save().then(()=>{
//     console.log(data)
// }).catch((error)=>{
//     console.log('Error! ',error)
// })

module.exports = tasks