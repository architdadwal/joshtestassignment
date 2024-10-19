"use client";

import { useState, useEffect } from "react";

export default function TaskManagement({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [completedTasks, setCompletedTasks] = useState([]); //for completed tasks
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [searchQuery, setSearchQuery] = useState(""); // for search query

  // sorting tasks by priority
  const sortTasksByPriority = (tasks) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...tasks].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  // Sorting priority when tasks change
  useEffect(() => {
    setTasks(sortTasksByPriority(tasks));
  }, []);

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      console.log("Adding task:", newTask);
      const updatedTasks = [
        ...tasks,
        { id: Date.now(), ...newTask, completed: false },
      ];
      setTasks(sortTasksByPriority(updatedTasks));
      setNewTask({ title: "", description: "", priority: "low" });
    } else {
      console.log("Task title and description are required.");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const handleSaveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...editedTask } : task
    );
    setTasks(sortTasksByPriority(updatedTasks));
    setEditingTaskId(null);
  };

  const handleToggleCompleteTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      if (task.completed) {
        // If task is already completed, move it back to tasks
        setTasks([
          ...tasks.filter((t) => t.id !== id),
          { ...task, completed: false },
        ]);
        setCompletedTasks(completedTasks.filter((t) => t.id !== id));
      } else {
        // If task is not completed, move it to completedTasks
        setCompletedTasks([...completedTasks, { ...task, completed: true }]);
        setTasks(tasks.filter((t) => t.id !== id));
      }
    }
  };

  // Filter based on search
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTaskStyle = (priority) => {
    if (priority === "high") {
      return { backgroundColor: "rgba(255, 0, 0, 0.3)" };
    } else if (priority === "medium") {
      return { backgroundColor: "rgba(255, 255, 0, 0.3)" };
    } else if (priority === "low") {
      return { backgroundColor: "rgba(0, 255, 0, 0.3)" };
    } else {
      return {};
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ padding: "10px", textAlign: "center" }}>
        Task Management App
      </h1>
      <h3 style={{ padding: "10px" }}> Add new task</h3>

      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <select
        value={newTask.priority}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        style={{ marginBottom: "10px", padding: "8px" }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={handleAddTask}
        style={{ marginBottom: "20px", padding: "8px 16px" }}
      >
        Add Task
      </button>
      <h3 style={{ padding: "10px" }}>Search in exiting tasks</h3>

      <input
        type="text"
        placeholder="Enter text here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "100%", padding: "8px" }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
              ...getTaskStyle(task.priority),
              textDecoration: task.completed ? "line-through" : "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  style={{ marginRight: "10px", flex: 1 }}
                />
                <input
                  type="text"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  style={{ marginRight: "10px", flex: 1 }}
                />
                <select
                  value={editedTask.priority}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, priority: e.target.value })
                  }
                  style={{ marginRight: "10px" }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button onClick={() => handleSaveTask(task.id)}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleteTask(task.id)}
                  style={{ marginRight: "10px" }}
                />
                <strong>{task.title}</strong> - {task.description} (
                {task.priority})
                <button
                  style={{ marginLeft: "10px", color: "blue" }}
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  style={{ marginLeft: "10px", color: "red" }}
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {completedTasks.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Completed Tasks</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {completedTasks.map((task) => (
              <li
                key={task.id}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "5px",
                  ...getTaskStyle(task.priority),
                  textDecoration: "line-through",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <strong>{task.title}</strong> - {task.description} (
                {task.priority})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
