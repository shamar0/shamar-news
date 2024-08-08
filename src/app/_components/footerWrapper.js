"use client";

import { usePathname } from 'next/navigation';
import Footer from './footer';

const FooterWrapper = () => {
  const pathname = usePathname();
  const shouldShowFooter = pathname !== '/';
  return shouldShowFooter ? <Footer /> : null;
};

export default FooterWrapper;
