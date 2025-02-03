import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react'
import { UserButton } from "@clerk/nextjs"

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Alumni Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Input type="search" placeholder="Search..." className="w-64" />        
          <UserButton />        
      </div>
    </header>
  )
}

