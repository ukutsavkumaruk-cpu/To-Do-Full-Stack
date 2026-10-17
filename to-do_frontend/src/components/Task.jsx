import { useContext } from "react";
import { TodoItemsContext } from "../store/todo-items-store";

function Task({ work, date,id}) {
  const {handleDelete} = useContext(TodoItemsContext);

  return (<div className="container margin">
    <div className="row align-items-center task-row">
      <div className="col-5 task-text">{work}</div>
      <div className="col-4 task-date">{new Date(date).toLocaleDateString("en-IN")}</div>

      <div className="col-3 d-flex justify-content-center">
        <button type="button" className="btn btn-danger task-delete" onClick={()=>{handleDelete(id)}}>Delete</button>
      </div>
    </div>
  </div>)
}
export default Task;