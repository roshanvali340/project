import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      const newTask = { id: Date.now(), text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = () => {
    if (editTaskText.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editTaskText } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditTaskText("");
    }
  };

  const handleToggleTaskCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditButtonClick = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  return (
    <div className="App">
      <h1>Simple React To-Do Application</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <span className={task.completed ? "completed" : ""}>
              {task.text}
            </span>
            <div>
              <button onClick={() => handleToggleTaskCompleted(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleEditButtonClick(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editTaskId !== null && (
        <div className="edit-task-popup">
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
          />
          <button onClick={handleEditTask}>Save</button>
        </div>
      )}
    </div>
  );
};

export default App;
