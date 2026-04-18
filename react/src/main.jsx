import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Megkeresi a spa.html-ben a "root" azonosítójú divet
const rootElement = document.getElementById('root');

// Létrehozza a React gyökeret és kirajzolja az App komponenst
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}