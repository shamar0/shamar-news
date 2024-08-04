'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import UserContext from "../contex/UserContex";
import Signup from "./signup";
import '../../../public/navStyle.css'
import Login from "./login";



function Navbar() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const initialSearch = searchParams.get("search") || '';
  const [placeholder, setPlaceholder] = useState('Search');
  const placeholders = ['Search "Virat Kohli"', 'Search "India"', 'Search "Meta"', 'Search "Mumbai"', 'Search "Football"', 'Search "Olympic"', 'Search "Mountain"', 'Search "Space"'];
  const { user, logout } = useContext(UserContext);
  
  //  <-----for Signup  Login form(starts)--->
  let [isSignupVisible, setSignupVisible] = useState(false);
  let [isLoginVisible, setLoginVisible] = useState(false);

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
  // <-----for Signup form (end)--->

  useEffect(() => {
    const changePlaceholder = () => {
      setPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    };
    const intervalId = setInterval(changePlaceholder, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) router.push(`/products?search=${searchTerm}`);
    else router.push(`/news`);
  };

  // Refs for DOM elements
  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);
  const closeBtnRef = useRef(null);

  // event listeners for sidebar toggle
  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const sidebar = sidebarRef.current;
    const closeBtn = closeBtnRef.current;

    const openSidebar = () => {
      sidebar.style.left = '0';
    };

    const closeSidebar = () => {
      sidebar.style.left = '-270px';
    };

    if (hamburger && sidebar && closeBtn) {
      hamburger.addEventListener('click', openSidebar);
      closeBtn.addEventListener('click', closeSidebar);

      return () => {
        hamburger.removeEventListener('click', openSidebar);
        closeBtn.removeEventListener('click', closeSidebar);
      };
    }
  }, [hamburgerRef, sidebarRef, closeBtnRef]);

  const closeSidebar = () => {
    const sidebar = sidebarRef.current;
    sidebar.style.left = '-270px';
  };

  return (
    <nav className="navbar" style={{ backgroundColor: "#ECEBEB" }}>
      <div className="navbar-content container-fluid p-0">
        <div className="navbar-left-div" >
        <div className="navbar-item navbar-left-div-item">
          <div className="hamburger-container">
           <i className="fa-solid fa-bars" id="hamburger" ref={hamburgerRef}></i>
          </div>

       <div className="sidebar" id="sidebar" ref={sidebarRef}>
        {user ? (
            <>
          <span className="sidebar-user">Welcome,<br></br> {user.username}</span>
        </>
      ) :  null  }
        <button className="close-btn" id="close-btn" ref={closeBtnRef}>&times;</button>
        <div className="sidebar-divs">
           <div className="sidebar-div-item">
           <Link className="sidebar-div-item-link" href="/news" onClick={closeSidebar}>Home</Link>
           </div>
           <div className="sidebar-div-item">
           <Link className="sidebar-div-item-link" href="/saved_articles" onClick={closeSidebar}><i className="fa-solid fa-bookmark"></i> Saved Article</Link>
           </div>
           {user ? (
           <div className="sidebar-div-item">
           <button className="sidebar-div-item-btn" onClick={logout}>Logout</button>
           </div>
           ):(
           <>
           <div className="sidebar-div-item">
           <button className="sidebar-div-item-btn" onClick={()=>{handleLoginClick(); closeSidebar()} }>Login</button>
           </div>
           <div className="sidebar-div-item">
           <button className="sidebar-div-item-btn" onClick={()=>{handleSignupClick(); closeSidebar()}}>Sign up</button>
           </div>
           </>
           )}
        </div>
    </div>

           <Link className="nav-logo" href="/news">
            <i className="fa-brands fa-slack nav-logo-img">
              <span className="nav-logo-text"> shamar news</span>
            </i>
           </Link>
          
        </div>
        <div className="navbar-item navbar-search">
          <form onSubmit={handleSearch} className="d-flex nav-form" role="search">
            <input
              className="form-control"
              type="search"
              placeholder={placeholder}
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="nav-btn" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        </div>
       
        <div className="navbar-right-div" >
        {user ? (
          <div className="navbar-right-div-item">
            <button className="ls-btn signup" onClick={logout}>Logout</button>
            </div>
        ) : (
          <>
            <div className="nav-log-sign" >
              <button className="ls-btn login" onClick={handleLoginClick}>Login</button>
              <button className="ls-btn signup" onClick={handleSignupClick}>Sign up</button>
            </div>
          </>
        )}
        <div className="d-flex justify-content-end navbar-right-div-item">
          <Link href="/saved_articles" class="save-button">
            <i className="fa-solid fa-bookmark"></i>
            <span className="text">Saved</span>
          </Link>
        </div>
      </div>
      </div>
      
      <Login isLoginVisible={isLoginVisible} handleLoginClose={handleLoginClose} handleSignupClick={handleSignupClick} />
      <Signup isSignupVisible={isSignupVisible} handleSignupClose={handleSignupClose} handleLoginClick={handleLoginClick} />
    </nav>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
    </Suspense>
  );
}