import './styles/App.css';  // Import CSS
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setUser(token);
    }, []);

    return (
        <Router>
            <Navbar user={user} setUser={setUser} />
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
