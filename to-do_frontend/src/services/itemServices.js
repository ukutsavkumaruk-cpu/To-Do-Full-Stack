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
  return result;
  
}