import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h2>Project Management Tool</h2>
            <div>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
