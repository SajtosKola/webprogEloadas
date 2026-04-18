import React, { useState } from 'react';

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
            <h2>1. Alkalmazás: Teendő Lista</h2>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Írj be egy feladatot..."
            />
            <button onClick={addTask} style={{ marginLeft: '5px' }}>Hozzáadás</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                        {task} <button onClick={() => deleteTask(index)} style={{ color: 'red' }}>X</button>
                    </li>
                ))}
            </ul>
            <p>Összesen: {tasks.length} feladat</p>
        </div>
    );
}