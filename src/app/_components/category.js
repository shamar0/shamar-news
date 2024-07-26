"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import '../../../public/style.css';

export default function Category() {
  const [activeLink, setActiveLink] = useState('');
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setActiveLink(path);

    
    const handleResize = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  
  const handleClick = (path) => {
    setActiveLink(path);
  };
  
  
  return (
    <div className="filters-wrapper">

      <div className="filters" ref={scrollRef}>
        <div className={`ind-filter ${activeLink === '/news' ? 'active' : ''}`}>
          <Link className='category-text' href="/news" onClick={() => handleClick('/news')}>
           <span> All</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/trending' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/trending" onClick={() => handleClick('/category/trending')}>
            <span>Trending</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/health' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/health" onClick={() => handleClick('/category/health')}>
           <span> Health</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/education' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/education" onClick={() => handleClick('/category/education')}>
            <span> Education</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/sports' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/sports" onClick={() => handleClick('/category/sports')}>
            <span> Sports</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/it' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/it" onClick={() => handleClick('/category/it')}>
            <span> IT</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/business' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/business" onClick={() => handleClick('/category/business')}>
            <span> Business</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/tech' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/tech" onClick={() => handleClick('/category/tech')}>
            <span> Tech</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/entertainment' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/entertainment" onClick={() => handleClick('/category/entertainment')}>
            <span> Entertainment</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/politics' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/politics" onClick={() => handleClick('/category/politics')}>
            <span> Politics</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/science&enviroment' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/science&enviroment" onClick={() => handleClick('/category/science&enviroment')}>
            <span>Science/Enviroment</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
}