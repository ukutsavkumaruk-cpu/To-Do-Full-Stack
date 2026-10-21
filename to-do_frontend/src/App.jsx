import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import DashboardHero from './components/DashboardHero'
import TodoPanel from './components/TodoPanel'
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
  const [kaams, dispatchkaams] = useReducer(kaamsReducer,[])
  
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

  const completedCount = kaams.filter((kaam) => kaam.completed).length
  const pendingCount = kaams.length - completedCount

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
    <main className="app-shell">
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
        <div className="app-content">
          <AppHeader />
          <DashboardHero
            taskCount={kaams.length}
            pendingCount={pendingCount}
            completedCount={completedCount}
          />
          <TodoPanel taskCount={kaams.length} />
          <AppFooter />
        </div>
      </TodoItemsContext.Provider>
    </main>
  )
};
export default App
