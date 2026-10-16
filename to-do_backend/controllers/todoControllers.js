const todoItems = require("../model/todoItems");

exports.createTodoItem = async (req, res , next) =>{
  const{task,date} = req.body;
  const todoItem = new  todoItems({
    task,
    date
  })
  await todoItem.save()
  .then(() =>{
    console.log("Item created");
  })
  .catch(err =>{
    console.log("Error while item creation");
  })
 
  res.status(201).json({message: "Todo Item Created",todo:todoItem});
}