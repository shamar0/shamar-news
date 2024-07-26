// _components/NavbarWrapper.js
"use client";

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

const NavbarWrapper = () => {
  const pathname = usePathname();
  const shouldShowNavbar = pathname !== '/';
  return shouldShowNavbar ? <Navbar /> : null;
};

export default NavbarWrapper;
