import AddTaskForm from './AddTaskForm';
import TodoItem from "./TodoItem";

function App(props) {
  const taskList = props.tasks?.map((task) => (
    <TodoItem
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
    />
  ));

  return (
      <main className="m-4">
          <AddTaskForm />
          <section>
              <h1 className="text-xl font-bold my-2">To do</h1>
              <ul className="flex flex-col gap-1">
                  {taskList}
              </ul>
          </section>
      </main>
  );
}

export default App;
