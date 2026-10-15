const express = require('express')
const {createTodoItem} = require('../controllers/todoControllers');



const tasksRouter = express.Router();

tasksRouter.get("/",createTodoItem)



module.exports = tasksRouter;