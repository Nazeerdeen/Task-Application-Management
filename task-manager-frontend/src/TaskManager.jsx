import React, { useState, useEffect } from 'react';

function TaskManager({ user }) {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');

    -useEffect(() => {


    }, [user]);

    const addTask = () => {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const deadline = document.getElementById('taskDeadline').value;
        const priority = document.getElementById('taskPriority').value;
        const assignedTo = document.getElementById('assignedTo').value;

        if (title && description && deadline && assignedTo) {
            const newTask = {
                title,
                description,
                deadline,
                priority,
                assignedTo,
            };

            setTasks([...tasks, newTask]);

            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskDeadline').value = '';
            document.getElementById('taskPriority').value = 'Medium';
            document.getElementById('assignedTo').value = '';
        } else {
            alert('Please fill out all fields.');
        }
    };

    const filteredTasks = tasks.filter(task => {
        const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const priorityMatch = priorityFilter === 'All' || task.priority === priorityFilter;
        return titleMatch && priorityMatch;
    });

    return (
        <div>
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <select
                    value={priorityFilter}
                    onChange={e => setPriorityFilter(e.target.value)}
                    className="priority-filter"
                >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className="task-form">
                <input type="text" id="taskTitle" placeholder="Task Title" required /><br /><br />
                <textarea id="taskDescription" placeholder="Task Description" required></textarea><br /><br />
                <input type="date" id="taskDeadline" required /><br /><br />
                <select id="taskPriority">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select><br /><br />
                <input type="text" id="assignedTo" placeholder="Assign To" required /><br /><br />
                <button className="button" onClick={addTask}>Add Task</button>
            </div>


            <div className="added-tasks-container">
                <h2>Added Tasks</h2>
                <div className="task-list"> {/* Use task-list class here too */}
                    {tasks.map((task, index) => (
                        <div key={index} className="task-item"> {/* task-item class here */}
                            <div className="task-content"> {/* New div for task content */}
                                <strong>{task.title}</strong><br />
                                {task.description}<br />
                                <strong>Deadline:</strong> {task.deadline}<br />
                                <strong>Priority:</strong> {task.priority}<br />
                                <strong>Assigned To:</strong> {task.assignedTo}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default TaskManager;