'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import '../../../public/navStyle.css'

function Navbar() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const initialSearch = searchParams.get("search") || '';
  const [placeholder, setPlaceholder] = useState('Search');
  const placeholders = ['Search "Virat Kohli"', 'Search "India"', 'Search "Meta"', 'Search "Mumbai"', 'Search "Football"', 'Search "Olympic"', 'Search "Mountain"', 'Search "Space"'];

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


  return (
    <nav className="navbar" >
    {/* <nav className="navbar" style={{ backgroundColor: "#ECEBEB" }}> */}
      <div className="navbar-content container-fluid p-0">
        {/* <div className="navbar-left-div" > */}
          {/* <div className="navbar-item navbar-left-div-item"> */}
          <div className="navbar-item ">
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
        {/* </div> */}
      </div>
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