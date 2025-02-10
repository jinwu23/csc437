import React from "react";
import { nanoid } from "nanoid";

import AddTaskForm from './components/AddTaskForm';
import TodoItem from "./components/TodoItem";
import Modal from "./components/Modal";


const TASK_DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

function App() {
  function toggleTaskCompleted(id) {
    const updatedTasks = taskList.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = taskList.filter((task) => id !== task.id);
    setTaskList(remainingTasks);
  }

  const [taskList, setTaskList] = React.useState(TASK_DATA);

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTaskList([...taskList, newTask]);
    setModalIsOpen(false);
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const todoItems = taskList.map((task) => (
    <TodoItem
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  return (
    <main className="m-4">
      <button className="bg-blue-300 px-6 py-3 rounded-md" onClick={() => {setModalIsOpen(true)}}>
        Add Task
      </button>
      <section>
          <h1 className="text-xl font-bold my-2">To do</h1>
          <ul className="flex flex-col gap-1">
              {todoItems}
          </ul>
      </section>
      <Modal
        headerLabel={"New Task"}
        children={<AddTaskForm onNewTask={addTask} />}
        isOpen={modalIsOpen}
        onCloseRequested={() => { setModalIsOpen(false) }}
      />
      </main>
  );
}

export default App;
