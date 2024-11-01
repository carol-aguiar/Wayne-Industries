// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ResourceManagement from './components/ResourceManagement';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Wayne Industries</h1>
                <Routes>
                    <Route path="/" element={<Login />} /> {/* Tela de login ao iniciar */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/resources" element={<ResourceManagement />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
