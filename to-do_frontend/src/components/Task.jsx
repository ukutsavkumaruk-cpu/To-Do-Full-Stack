import { useContext } from "react";
import { TodoItemsContext } from "../store/todo-items-store";

function Task({ work, date,id,completed}) {
  const {handleDelete,handleUpdate} = useContext(TodoItemsContext);

  return (<div className="container margin">
    <div className="row align-items-center task-row">
      <div className="col-5 task-text">{work}</div>
      <div className="col-4 task-date">{new Date(date).toLocaleDateString("en-IN")}</div>

      <div className="col-3 d-flex justify-content-center">
        <button type="button" className={`btn task-delete ${completed ? "btn-secondary" : "btn-success"}`}onClick={()=>{handleUpdate(id,completed)}}>{completed? "Completed" : "Due"}</button>
        <button type="button" className="btn btn-danger task-delete" onClick={()=>{handleDelete(id)}}>Delete</button>
      </div>
    </div>
  </div>)
}
export default Task;