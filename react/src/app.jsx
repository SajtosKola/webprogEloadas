import React, { useState } from 'react';
import TodoList from './todo'; // Figyelj a kis/nagybetűkre a fájlneveknél!
import Quiz from './kviz';     // Ha a fájlod Kviz.jsx, akkor írd át arra!
import AxiosCrud from './AxiosCrud';

function App() {
    // 1. Megnézzük, hogy melyik HTML fájl töltötte be a scriptet
    const isAxiosPage = window.location.pathname.includes('axios.html');

    // 2. State a SPA (Teendők/Kvíz) közötti váltáshoz
    const [view, setView] = useState('todo');

    // 3. Ha az axios.html-en vagyunk, CSAK az AxiosCrud komponenst adjuk vissza
    if (isAxiosPage) {
        return (
            <div style={{ fontFamily: 'Arial', maxWidth: '800px', margin: 'auto' }}>
                <AxiosCrud />
            </div>
        );
    }

    // 4. Minden más esetben (spa.html) a korábbi menüt mutatjuk
    return (
        <div style={{ fontFamily: 'Arial', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <h1>SPA Projekt - React</h1>
            <nav style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setView('todo')}
                    style={{ marginRight: '10px', padding: '8px 15px', cursor: 'pointer' }}
                >
                    Teendők
                </button>
                <button
                    onClick={() => setView('quiz')}
                    style={{ padding: '8px 15px', cursor: 'pointer' }}
                >
                    Kvíz játék
                </button>
            </nav>
            <hr />

            {/* Váltás a nézetek között */}
            {view === 'todo' ? <TodoList /> : <Quiz />}
        </div>
    );
}

export default App;