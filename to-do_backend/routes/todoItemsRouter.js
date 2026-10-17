const express = require('express')
const {createTodoItem,getTodoItem,deleteTodoItem,updatedTodoItem} = require('../controllers/todoControllers');



const tasksRouter = express.Router();

tasksRouter.get("/",getTodoItem)
tasksRouter.post("/",createTodoItem)
tasksRouter.delete("/:id",deleteTodoItem)
tasksRouter.put("/:id/completed",updatedTodoItem)



module.exports = tasksRouter;