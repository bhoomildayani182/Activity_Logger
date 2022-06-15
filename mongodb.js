//CRUD operarions
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectID, ObjectId } = require('mongodb')
const logger = require('./logger')

const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=>{
    if(error){
        return logger.error('Unable to connect to database!')
    }
    
    // const db = client.db(databaseName)

//creating a data
    
    // db.collection('users').insertOne({
    //     name: 'Uttam',
    //     age: 19   
    // }, (error, result)=>{
//         if(error) {
//              return console.log('Unable to insert user!')
//          }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Parth',
    //         age: 22
    //     }, {
    //         name: 'Meet',
    //         age: 20
    //     }
    // ], (error, result)=>{
    //     if(error) {
    //         return console.log('Unable to insert Documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         Description: 'Cooking',
    //         completed: true
    //     }, {
    //         Description: 'Running',
    //         completed: false      
    //     }, {
    //         Description: 'Work',
    //         completed: true
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to imsert Documents!')
    //     }
    //     setTimeout(() => {
    //         console.log(result.ops)
    //     }, 2000);
    // })

//Reading a data
    ///for find Single
    // db.collection('users').findOne({ _id: new ObjectId('628cd7bbab344ff79557ac12') }, (error, user)=>{
    //     if(error) return console.log('Unable to fetch')

    //     console.log(user)
    // })

    ///for find multiple
    // db.collection('users').find({ name: 'Uttam' }).toArray((error, users)=>{
    //     if(error) return console.log('Unable to fetch')

    //     console.log(users)
    // })
    
    // db.collection('users').find({ name: 'Uttam' }).count((error, count)=>{
    //     if(error) return console.log('Unable to fetch')

    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID('628ccd936646c014c72727c3')}, (error, user)=>{
    //     if(error) return console.log(error)

    //     console.log(user)
    // })

    // db.collection('tasks').find({ completed: false}).toArray((error, users)=>{
    //     if(error) return console.log('Unable to fetch')

    //     console.log(users)
    // })


// Updating the data

    /// Updating one data
    
    // db.collection('users').updateOne({
    //     _id: new ObjectId('628cdb7043eb55ff9e7c0c1e')
    // }, {
    //     $inc: {
    //         age: -19
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    ///Updating morethan one data

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

//Deleting the data

    ///Delete one data 

    // db.collection('users').deleteMany({
    //     age: 20
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    ///Deleting One data

    // db.collection('tasks').deleteOne({
    //     Description: 'Work'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
})