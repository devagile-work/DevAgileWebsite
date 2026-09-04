"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Do not render footer on admin paths
  if (pathname === '/kjl' || pathname?.startsWith('/kjl/')) {
    return null;
  }
  
  return <Footer />;
}
