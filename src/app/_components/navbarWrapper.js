"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const NavbarWrapper = () => {
  const pathname = usePathname();
  const shouldShowNavbar = pathname !== '/';
  return shouldShowNavbar ? <Navbar /> : null;
};

export default NavbarWrapper;
