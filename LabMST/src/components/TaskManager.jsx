import React, { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
    
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
}

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const { values, handleChange, resetForm } = useForm({
    title: "",
    priority: "Low",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: values.title,
      priority: values.priority,
    };

    setTasks([...tasks, newTask]);

    resetForm();
  };

  return (
    <div>
      <h2>Task Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={values.title}
          onChange={handleChange}
        />

        <select name="priority" value={values.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Add Task</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.title} | {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
