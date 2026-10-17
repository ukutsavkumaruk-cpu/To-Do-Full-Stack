import { useContext } from "react";
import { TodoItemsContext } from "../store/todo-items-store";
import { FiCalendar, FiCheck, FiClock, FiTrash2 } from "react-icons/fi";

function Task({ work, date,id,completed}) {
  const {handleDelete,handleUpdate} = useContext(TodoItemsContext);

  return (
    <article className={`task-row${completed ? " is-completed" : ""}`}>
      <span className="task-check" aria-hidden="true">
        {completed ? <FiCheck /> : <FiClock />}
      </span>
      <div className="task-details">
        <h4 className="task-text">{work}</h4>
        <span className="task-date">
          <FiCalendar aria-hidden="true" />
          {new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="task-actions">
        <button
          type="button"
          className={`btn task-status ${completed ? "status-completed" : "status-due"}`}
          aria-pressed={completed}
          onClick={() => handleUpdate(id, completed)}
        >
          {completed ? <FiCheck aria-hidden="true" /> : <FiClock aria-hidden="true" />}
          {completed ? "Completed" : "Mark done"}
        </button>
        <button
          type="button"
          className="btn task-delete"
          aria-label={`Delete ${work}`}
          onClick={() => handleDelete(id)}
        >
          <FiTrash2 aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
export default Task;