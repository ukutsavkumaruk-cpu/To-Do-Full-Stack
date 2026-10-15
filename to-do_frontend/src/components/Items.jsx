import Task from "./Task";
import { TodoItemsContext } from "../store/todo-items-store";
import { useContext } from "react";
function Items() {
    const {kaams} = useContext(TodoItemsContext)
    
    
    return <>
        {kaams.map((task, index) =>
            <Task key={index} index={index}
                work={task.task} date={task.date}
             >
            </Task>)}

    </>
}
export default Items;