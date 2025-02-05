import React from "react";

function AddTaskForm({ onNewTask }) {
    const [task, setTask] = React.useState("");

    function handleChange() {
        onNewTask(task);
        setTask("");
    }

    return (
        <div> 
            <input
                className="p-2 border-2 border-solid border-b-gray-600 rounded-md mr-2"
                placeholder="New task name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button
                className="bg-blue-300 hover:bg-blue-400 active:bg-blue-500 p-2 rounded-md"
                onClick={handleChange}
            >
            Add task
            </button>
        </div>
    );
}

export default AddTaskForm;