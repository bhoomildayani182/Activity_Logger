const express = require('express')
const auth = require('../src/middleware/auth')
const router = new express.Router()
const taskController = require('../controllers/taskController')

//Create Task
router.post('/tasks', auth, taskController.createTask)

//Read All Tasks
// GET / tasks?completed=true
//GET /tasks?limit=10&skip=0
// GET tasks/sortBy=createdAt:desc
router.get('/tasks', auth, taskController.readTasks)

//Read an Task whom's id provided
router.get('/tasks/:id', auth, taskController.readTaskFromId)

//Updating Tasks    
router.patch('/tasks/:id', auth, taskController.updateTask)

//Deleting an Task
router.delete('/tasks/:id', auth, taskController.deleteTask)

module.exports = router