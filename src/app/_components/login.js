'use client';

import { useContext, useState } from "react";
import UserContext from "../contex/UserContex";
import '../../../public/navStyle.css'


const Login = ({ isLoginVisible, handleLoginClose, handleSignupClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  
  if(!isLoginVisible) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    handleLoginClose();
      
  };

  return (
    <div className="modal-backdrop">
      <div className="signup-form-container">
        <div className="header text-center my-4">
          <div>
            <span className="italic text-muted">Welcome to</span>
          </div>
          <div>
            <span className="sign-log-logo">shamar news</span>
          </div>
        </div>
         
        <div className="form-content">
        <form onSubmit={handleLogin} className="form-group">
          <div className="mb-3">
            <label className="input-group">
              <span className="input-group-text">
              <i className="fa-regular fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control-sin-log"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="input-group">
              <span className="input-group-text">
              <i className="fa-solid fa-key"></i>
              </span>
              <input
                type="password"
                className="form-control-sin-log"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </label>
          </div>
          <button type="submit" className="sign-log-btn mb-3 mt-2">Login</button>
        </form>
          <span className="text-muted">Don't have an account? </span>
          <button className="sign-log-toggle-btn" onClick={() => { handleLoginClose(); handleSignupClick(); }}>Sign up</button>
         </div>
        
        <button className="close-button" onClick={handleLoginClose}>
        <i className="fa-regular fa-circle-xmark"></i>
        </button>

      </div>
     
      </div>
      
    );
};

export default Login;