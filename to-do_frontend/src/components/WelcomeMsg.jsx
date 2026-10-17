import { TodoItemsContext } from "../store/todo-items-store";
import { useContext } from "react";
import { FiCoffee } from "react-icons/fi";

function WelcomeMsg(){
    const {kaams}= useContext(TodoItemsContext)

    return kaams.length === 0 ? (
        <div className="empty-state">
            <span className="empty-icon"><FiCoffee aria-hidden="true" /></span>
            <h4>All clear for now</h4>
            <p>Add a task above and give your day a little direction.</p>
        </div>
    ) : null
}
export default WelcomeMsg;