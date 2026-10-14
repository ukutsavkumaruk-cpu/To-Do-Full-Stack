import { TodoItemsContext } from "../store/todo-items-store";
import { useContext } from "react";
function WelcomeMsg(){
    const {kaams}= useContext(TodoItemsContext)
        
    
    return (kaams.length === 0 && <h2>Enjoy your day Buddy...!....!</h2>)
}
export default WelcomeMsg;