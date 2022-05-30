const express = require('express')
const Task = require('../src/models/tasks')
const auth = require('../src/middleware/auth')
const router = new express.Router()

//Create Task
router.post('/tasks', auth, async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    } catch (e){
        res.status(400).send(e)
    }
})



//Read All Tasks
// GET / tasks?completed=true
//GET /tasks?limit=10&skip=0
// GET tasks/sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res)=>{
    const match = {} 
    const sort = {} 

    if(req.query.Completed){
        match.Completed = req.query.Completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        // const task = await Task.find({owner: req.user.id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                 limit: parseInt(req.query.limit),
                 skip: parseInt(req.query.skip),
                 sort
            }
        })
        res.send(req.user.tasks)
    } catch (e){
        res.status(500).send(e)
    }
    
})



//Read an Task whom's id provided
router.get('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task) return res.status(404).send()   

        res.send(task)
    } catch (e){
        res.status().send(e)
    }
})

//Updating Tasks
    
router.patch('/tasks/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Description', 'Completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))        
        
    if(!isValidOperation) return res.status(400).send({error: 'Invalid operarions'})
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        // const task = await Task.findById(req.params.id)
        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!task) return res.status(400).send({ error: 'Task not found'})
        
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e){
        res.status(400).send(e)
    } 
})

//Deleting an Task
router.delete('/tasks/:id', auth, async (req, res)=>{
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!task) return res.status(404).send({ "error": "Task not found"})

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router