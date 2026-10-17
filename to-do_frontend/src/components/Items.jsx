import Task from "./Task";
import { TodoItemsContext } from "../store/todo-items-store";
import { useContext } from "react";
function Items() {
    const {kaams} = useContext(TodoItemsContext)
    
    return <>
        {kaams.map((item, index) =>
            <Task
                key={index}
                id={item.id}
                work={item.task}
                date={item.date}
                completed={item.completed}
            />
        )}
    </>
}
export default Items;