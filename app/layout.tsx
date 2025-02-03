"use client"
import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'
import { Sidebar } from './components/Sidebar'
import MobileNavbar from './components/MobileNavbar'
import {
  ClerkProvider,
} from '@clerk/nextjs'

import { usePathname } from 'next/navigation'; 


const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname(); 
  const isSignInPage = pathname !== '/sign-in' && pathname !== '/sign-in/' &&  <Sidebar />;
  
  return (
//disable siebar and mobile navbar on sign-in

<ClerkProvider>
<html lang="en">
  <body className={poppins.className}>
    <div className="flex h-screen bg-gray-100">
      {isSignInPage} {/* Conditionally render Sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {pathname !== '/sign-in/'  && <MobileNavbar />} {/* Conditionally render MobileNavbar */}
        {children}
      </div>
    </div>
  </body>
</html>
</ClerkProvider>
  )
}