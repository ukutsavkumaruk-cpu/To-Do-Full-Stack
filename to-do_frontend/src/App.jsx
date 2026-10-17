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
          <header className="app-header">
            <AppName />
            <div className="workspace-label">
              <span className="workspace-indicator" />
              Your personal workspace
            </div>
          </header>

          <section className="dashboard-hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <span className="hero-eyebrow">A LITTLE MORE FOCUS, EVERY DAY</span>
              <h2 id="hero-title">Make space for<br />what matters.</h2>
              <p>Small steps add up. Keep your day moving, one task at a time.</p>
            </div>
            <div className="hero-stats" aria-label="Task summary">
              <div className="hero-stat">
                <span className="stat-value">{kaams.length}</span>
                <span className="stat-label">All tasks</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">{pendingCount}</span>
                <span className="stat-label">To do</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">{completedCount}</span>
                <span className="stat-label">Done</span>
              </div>
            </div>
            <span className="hero-orb hero-orb-one" />
            <span className="hero-orb hero-orb-two" />
          </section>

          <section className="todo-panel" aria-labelledby="todo-heading">
            <div className="panel-heading">
              <div>
                <span className="section-eyebrow">YOUR DAY, YOUR PACE</span>
                <h2 id="todo-heading">Task list<span className="heading-period">.</span></h2>
                <p>Capture it here. Make it happen out there.</p>
              </div>
              <div className="date-chip">
                <span className="date-chip-dot" />
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            <AddTodo />

            <div className="list-heading">
              <h3>Your tasks</h3>
              <span>{kaams.length} {kaams.length === 1 ? "item" : "items"}</span>
            </div>
            <WelcomeMsg />
            <Items />
          </section>

          <footer className="app-footer">
            <span className="footer-sparkle">✦</span>
            One thing at a time. You’ve got this.
          </footer>
        </div>
      </TodoItemsContext.Provider>
    </main>
  )
};
export default App
