import AppName from './components/AppName'
import AddTodo from './components/AddTodo'
import Items from './components/Items'
import WelcomeMsg from './components/WelcomeMsg'
import {TodoItemsContext} from './store/todo-items-store'
import './App.css'
import { useReducer, useState } from 'react'

const kaamsReducer=(kaams,action)=>{
  let newKaamsItems = kaams
  if(action.type === "NEW_KAAM")
    {
      newKaamsItems = [...kaams, { task: action.payload.newTask, date: action.payload.newDate }];
    }
    else if(action.type === "DELETE_KAAM")
    {
      newKaamsItems = kaams.filter((kaam, i) => { return (i !== action.payload.index) })
    }

    return newKaamsItems;
}

function App() {

  let [task, setTask] = useState("")
  let [date, setDate] = useState("")
  


  const [kaams, dispatchkaams] = useReducer(kaamsReducer,[])

  const NewKaamAdd = (newTask,newDate)=>{
    const newKaamAction = {
      type: "NEW_KAAM",
      payload: {
        newTask:newTask,
        newDate:newDate
      }
    }
    dispatchkaams(newKaamAction)
  }
  

  const handleDelete = (index) => {
    
    const DltKaamAction = {
      type: "DELETE_KAAM",
      payload: {
        index,
      }
    }
    dispatchkaams(DltKaamAction)
    
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
