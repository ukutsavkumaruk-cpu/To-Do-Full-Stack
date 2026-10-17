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
exports.getTodoItem = async (req, res, next) => {
  try {
    const result = await todoItems.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
exports.deleteTodoItem = async (req,res,next)=>{
  const id = req.params.id;
  await todoItems.findByIdAndDelete(id);
  res.status(200).json({
    message:"Todo deleted successfully"
  })
}
exports.updatedTodoItem = async (req,res,next)=>{
  const id = req.params.id;
  await todoItems.findByIdAndUpdate(id,{});
  res.status(200).json({
    message:"Todo updated successfully"
  })
}