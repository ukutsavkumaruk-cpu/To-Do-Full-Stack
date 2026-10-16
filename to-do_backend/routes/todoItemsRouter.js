const express = require('express')
const {createTodoItem} = require('../controllers/todoControllers');



const tasksRouter = express.Router();

tasksRouter.post("/",createTodoItem)



module.exports = tasksRouter;