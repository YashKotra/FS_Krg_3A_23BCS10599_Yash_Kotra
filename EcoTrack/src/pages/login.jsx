import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const login = () => useAuth();
const {setIsAuthenticated}=useAuth();
const navigate=useNavigate();
const handleLogin=()=>{
    setIsAuthenticated(true);
    navigate("/");
}
return (
<div>
    <h2>Login Page</h2>
    <button onClick={handleLogin}>Login</button>
</div>
)


export default login