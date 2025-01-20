"use client"
import Link from "next/link"
import { Home, Users, FileText, Settings } from 'lucide-react'
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from 'react';
export function Sidebar() {

  


  const pathname = usePathname ();
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white
          ${pathname === "/" ? "bg-white text-black" : "bg-red"}
          `}>
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link href="/alumni" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white
        ${pathname === "/alumni" ? "bg-white text-black" : "bg-red"}
        `}>
          <Users className="inline-block mr-2" size={20} />
          Manajemen Data
        </Link>
        <Link href="/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FileText className="inline-block mr-2" size={20} />
          Laporan
        </Link>
        <Link href="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Settings className="inline-block mr-2" size={20} />
          Pengaturan
        </Link>
      </nav>
    </div>
  )
}

