import AddTodo from "./AddTodo";
import Items from "./Items";
import WelcomeMsg from "./WelcomeMsg";

function TodoPanel({ taskCount }) {
    return (
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
                <span>{taskCount} {taskCount === 1 ? "item" : "items"}</span>
            </div>
            <WelcomeMsg />
            <Items />
        </section>
    );
}

export default TodoPanel;
