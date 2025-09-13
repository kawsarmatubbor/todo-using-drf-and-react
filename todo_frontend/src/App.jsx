import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const getTask = async () => {
        const response = await axios.get("http://localhost:8000/api/tasks/");
        setTasks(response.data);
    };
    useEffect(() => {
        getTask();
    }, []);

    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = async () => {
        const response = await axios.post("http://localhost:8000/api/tasks/", {
            title: newTask,
        });
        setTasks([...tasks, response.data]);
        setNewTask("");
    };

    const completeTask = async (id, currentStatus) => {
        const response = await axios.patch(
            `http://localhost:8000/api/tasks/${id}`,
            {
                is_complete: !currentStatus,
            }
        );
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, ...response.data } : task
            )
        );
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8000/api/tasks/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div className="container">
            <h1>Task list</h1>
            <div className="add-task">
                <input
                    type="text"
                    name="add-task"
                    id="add-task"
                    value={newTask}
                    placeholder="Task title"
                    onChange={handleChange}
                />
                <div className="button add-button" onClick={addTask}>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.is_complete}
                            onChange={() => {
                                completeTask(task.id, task.is_complete);
                            }}
                        />
                        <span className={task.is_complete ? "completed" : ""}>
                            {task.title}
                        </span>
                        <button
                            className="button delete"
                            onClick={() => {
                                deleteTask(task.id);
                            }}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
