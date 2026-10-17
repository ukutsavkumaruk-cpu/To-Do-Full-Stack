export const addItemToServer = async(task,date)=>{
  const response = await fetch("http://localhost:3009/api/todo",
    {
      method: "POST",
      headers:{
        "content-Type":"application/json"
      },
      body: JSON.stringify({
        task:task,
        date:date,
      })
    }
  )
  const result = await response.json();
  console.log("This is the result of API:  ",result)
  return mapSeveritemToLocalitem(result);
  
}
const mapSeveritemToLocalitem = (serveritem) =>{
  return {
    id : serveritem.todo._id,
    task:serveritem.todo.task,
    date:serveritem.todo.date,
    createdAt:serveritem.todo.createdAt,
    updatedAt:serveritem.todo.updatedAt,
  }
}

export const readItemFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3009/api/todo", {
      method: "GET"
    });

    const result = await response.json();
    const NewResult = result.map((serveritem) =>{
    return {
    id : serveritem._id,
    task:serveritem.task,
    date:serveritem.date,
    createdAt:serveritem.createdAt,
    updatedAt:serveritem.updatedAt,
    }}
  )
    console.log("Read result from server:", result);

    return NewResult;
  } catch (err) {
    console.log("Error while reading data:", err);
    throw err;
  }
};
export const deleteTodoFromServer = async (id) =>{
  try{
    console.log("This is the  id for deletion: ",id)
    const response = await fetch(`http://localhost:3009/api/todo/${id}`,{
      method:"DELETE",
    })
  }
  catch (err) {
    console.log("Error occur while deleting",err)
  }
}
export const updateTodoStatus =async(id) =>{
  try{
    const response = await fetch(`http://localhost:3009/api/todo/${id}/completed`,{
      method:"PUT"
    })
    const result = await response.json();
    console.log("This the response from server after updation : ",result)
    return result;
  }
  catch (err){
     console.log("Error occur while updating status.",err)
  }
}