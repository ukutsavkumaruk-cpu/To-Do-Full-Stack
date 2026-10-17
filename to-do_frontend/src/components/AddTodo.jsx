import { FiCalendar, FiPlus } from "react-icons/fi";
import { useContext } from "react";
import { TodoItemsContext } from "../store/todo-items-store";
function AddTodo(){


    const {NewKaamAdd,handleOnChange,task,date} = useContext(TodoItemsContext);


    return (
        <div className="todo-entry">
            <label className="entry-field task-entry-field">
                <span className="entry-label">WHAT NEEDS DOING?</span>
                <input
                    className="task-input"
                    placeholder="e.g. Finish the project proposal"
                    name="task"
                    value={task}
                    onChange={handleOnChange}
                    type="text"
                />
            </label>
            <label className="entry-field date-entry-field">
                <span className="entry-label">WHEN?</span>
                <span className="date-input-wrap">
                    <FiCalendar aria-hidden="true" />
                    <input
                        className="task-input"
                        name="date"
                        value={date}
                        onChange={handleOnChange}
                        type="date"
                        aria-label="Task due date"
                    />
                </span>
            </label>
            <button
                type="button"
                id="add"
                onClick={() => NewKaamAdd(task, date)}
                className="btn add-btn"
            >
                <FiPlus aria-hidden="true" />
                <span>Add task</span>
            </button>
        </div>
    )
}
export default AddTodo;