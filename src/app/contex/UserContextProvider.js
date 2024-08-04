"use client"
require('dotenv').config()
import React, { useEffect, useState } from "react";
import UserContext from "./UserContex";
import axios from "axios";

import { useRouter } from "next/navigation";

const UserContextProvider = ({children}) =>{
   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get("http://newsinsummary-env.eba-t6yjac2w.ap-south-1.elasticbeanstalk.com/check-auth" , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error('Error during authentication check:', error);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://newsinsummary-env.eba-t6yjac2w.ap-south-1.elasticbeanstalk.com/login", { username, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      router.push('/news');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await axios.post("http://newsinsummary-env.eba-t6yjac2w.ap-south-1.elasticbeanstalk.com/signup", { username, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      router.push('/news'); 
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed: ' + error.message);
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/news');
  };

 
      return(
        <UserContext.Provider value={{user, login, signup, logout}}>
            {children}
        </UserContext.Provider>
      )
       
}

export default UserContextProvider