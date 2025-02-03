
function AddTaskForm(props) {
    return (
        <div> 
            <input
            className="p-2 border-2 border-solid border-b-gray-600 rounded-md mr-2"
            placeholder="New task name"
            />
            <button
            className="bg-blue-300 hover:bg-blue-400 active:bg-blue-500 p-2 rounded-md">
            Add task
            </button>
        </div>
    );
}

export default AddTaskForm;