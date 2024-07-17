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

    // Check if the filters container has overflow
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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="filters-wrapper">
      <div className="filters" ref={scrollRef}>
      {showArrows && <button className="arrow-btn left" onClick={() => scroll('left')}>&lt;</button>}
        <div className={`ind-filter ${activeLink === '/news' ? 'active' : ''}`}>
          <Link className='category-text' href="/news" onClick={() => handleClick('/news')}>
           <span> All</span>
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
          <Link className='category-text' href="/category/it" onClick={() => handleClick('/category/sports')}>
            <span> IT</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/business' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/business" onClick={() => handleClick('/category/startup')}>
            <span> Business</span>
          </Link>
        </div>

        <div className={`ind-filter ${activeLink === '/category/tech' ? 'active' : ''}`}>
          <Link className='category-text' href="/category/tech" onClick={() => handleClick('/category/startup')}>
            <span> Tech</span>
          </Link>
        </div>
        
      {showArrows && <button className="arrow-btn right" onClick={() => scroll('right')}>&gt;</button>}
      </div>
    </div>
  );
}