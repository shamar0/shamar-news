'use client';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Home from '../_components/home';
import UserContext from '../contex/UserContex';
import Login from '../_components/login';
import Signup from '../_components/signup';

const SavedArticles = () => {
  const [data, setData] = useState([]);
  const [isLoginVisible, setLoginVisible] = useState(false);
  let [isSignupVisible, setSignupVisible] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setLoginVisible(true); // Show login modal if user is not logged in
      return;
    }
    
    const fetchSavedArticles = async () => {
      try {
        const response = await axios.get("http://newsinsummary-env.eba-t6yjac2w.ap-south-1.elasticbeanstalk.com/users/saved-articles/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch saved articles:', error);
      }
    };

    fetchSavedArticles();
  }, [user]);

  const handleLoginClick = () => {
    setLoginVisible(true);
  };


  const handleLoginClose = () => {
    setLoginVisible(false);
  };
  
  const handleSignupClick = () => {
    setSignupVisible(true);
  };
  const handleSignupClose = () => {
    setSignupVisible(false);
  };


  return (
    <>
      <Login isLoginVisible={isLoginVisible} handleLoginClose={handleLoginClose} handleSignupClick={handleSignupClick} />
      <Signup isSignupVisible={isSignupVisible} handleSignupClose={handleSignupClose} handleLoginClick={handleLoginClick} />

      {user && <Home data={data} />}
    </>
  );
};

export default SavedArticles;
