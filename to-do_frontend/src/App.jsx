import AppName from './components/AppName'
import AddTodo from './components/AddTodo'
import Items from './components/Items'
import WelcomeMsg from './components/WelcomeMsg'
import {TodoItemsContext} from './store/todo-items-store'
import './App.css'
import { useEffect, useReducer, useState } from 'react'
import {addItemToServer,readItemFromServer,deleteTodoFromServer,updateTodoStatus} from './services/itemServices'

const kaamsReducer=(kaams,action)=>{
  let newKaamsItems = kaams
  if(action.type === "NEW_KAAM")
    {
      newKaamsItems = [...kaams, { task: action.payload.todo.task, date: action.payload.todo.date, id: action.payload.todo._id}];
    }
  else if(action.type === "DELETE_KAAM")
    {
      newKaamsItems = kaams.filter((kaam) => { return (kaam.id !== action.payload.id) })
    }
  else if(action.type === "LOAD KAAM")
  {
    newKaamsItems  = action.payload.todo;
  }

  else if(action.type === "UPDATE_KAAM")
  {
    newKaamsItems  = kaams.map((kaam)=>{
       return kaam.id === action.payload.todo._id ? {...kaam,completed:true} : kaam
    })
  }

    return newKaamsItems;
}

function App() {

  let [task, setTask] = useState("")
  let [date, setDate] = useState("")
  
  useEffect(()=>{
     readItemFromServer()
      .then(data =>{
        const readKaamsAction ={
          type: "LOAD KAAM",
          payload:{
            todo:data
          }
        }
         dispatchkaams(readKaamsAction)
      })
      .catch(err => console.log("Not Aable to read server beacause: ",err));
  },[])

  const [kaams, dispatchkaams] = useReducer(kaamsReducer,[])

  const NewKaamAdd = async (newTask,newDate)=>{
    const serverItem = await addItemToServer(newTask,newDate)
    const newKaamAction = {
      type: "NEW_KAAM",
      payload: {
        todo : serverItem,
      }
    }
    dispatchkaams(newKaamAction)
  }
  

  const handleDelete = async (id) => {
    await deleteTodoFromServer(id);
    const DltKaamAction = {
      type: "DELETE_KAAM",
      payload: {
        id,
      }
    }
    dispatchkaams(DltKaamAction)
    
  }
   const handleUpdate = async (id) => {
    const result = await updateTodoStatus(id);
    const updateKaamAction = {
      type: "UPDATE_KAAM",
      payload: {
        todo:result.todo,
      }
    }
    dispatchkaams(updateKaamAction)
    
  }

  let handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "task") {
      setTask(value);

    }
    else if (name === "date") {

      setDate(value)
    }
  }

  return (

    <>
      <TodoItemsContext.Provider value={
        {
        kaams,
        NewKaamAdd,
        handleDelete,
        handleOnChange,
        handleUpdate,
        task,      
        date,
        }
      }>
        <center className="todo-container" >
          <AppName />
          <AddTodo  />
          <WelcomeMsg></WelcomeMsg>
          <Items/>
        </center>
      </TodoItemsContext.Provider></>
  )
};
export default App
