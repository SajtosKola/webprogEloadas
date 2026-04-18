import React, { useState } from 'react';
import TodoList from './todo';
import Quiz from './kviz';

function App() {
    const [view, setView] = useState('todo');

    return (
        <div style={{ fontFamily: 'Arial', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <h1>SPA Projekt - React</h1>
            <nav style={{ marginBottom: '20px' }}>
                <button onClick={() => setView('todo')} style={{ marginRight: '10px' }}>Teendők</button>
                <button onClick={() => setView('quiz')}>Kvíz játék</button>
            </nav>
            <hr />
            {view === 'todo' ? <TodoList /> : <Quiz />}
        </div>
    );
}

export default App;