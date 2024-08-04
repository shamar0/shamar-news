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
  console.log(process.env.NEXT_PUBLIC_BACKEND_API);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/check-auth` , {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, { username, password });
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/signup`, { username, password });
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