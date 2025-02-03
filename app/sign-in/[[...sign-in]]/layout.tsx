"use client"
import React from "react";

import { usePathname } from 'next/navigation'
import { Sidebar } from "@/app/components/Sidebar";
import MobileNavbar from "@/app/components/MobileNavbar";
const SignInLayout = ({
    children
}: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        //disable sidebar navigation

        <div className="flex h-screen items-center justify-center">
            {children}
        </div>
    )
}

export default SignInLayout;