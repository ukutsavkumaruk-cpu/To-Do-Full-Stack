import { IoMdAdd } from "react-icons/io";
import { useContext } from "react";
import { TodoItemsContext } from "../store/todo-items-store";
function AddTodo(){


    const {NewKaamAdd, kaams,handleOnChange,task,date} = useContext(TodoItemsContext);


    return <div className="container text-center margin">
        <div className="row align-items-center">
          <div className="col-5">
            <input className="task-input" placeholder="Enter task" name="task" value={task} onChange={handleOnChange} type="text"></input>
          </div>
          <div className="col-4">
            <input className="task-input" placeholder="Enter date" name="date" value={date} onChange={handleOnChange} type="date"></input>
          </div>
          <div className="col-3">
            <button type="button" key={"Add"} id={"add"} onClick={() => NewKaamAdd(task, date)} className="btn btn-success add-btn"><IoMdAdd /></button>
          </div>
        </div>
      </div>
}
export default AddTodo;