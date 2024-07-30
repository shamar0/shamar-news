'use client'
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/router';



export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/products?search=${searchTerm}`);
  };
  return (
   <>
    <nav className="navbar bg-body-tertiary" >
    <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
  <div className="container nav-img" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>, 
    <Link className="navbar-brand nav-brand" href="/news">
      <Image src="/MS.png" alt="Logo" width={170} height={63}/>
    </Link>
  </div>
   </nav>
   </>
  )
}
