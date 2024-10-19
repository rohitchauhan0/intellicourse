"use client"

import { SIDEBAR_LINKS } from '@/data/SidebarLinks'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname()
    const { data: session } = useSession()
    return (
        <div className=' w-[300px] bg-light-black border-r border-gray-600 py-10  h-screen overflow-y-scroll'>
            <div className=' flex flex-col  px-2 space-y-6 text-white'>
                {
                    SIDEBAR_LINKS.map((link) => (
                        session?.user?.role === link.accountType && <Link href={link.link} key={link.id} className={`flex items-start space-x-4 hover:scale-105 transition-all duration-200 ${pathname === link.link ? ' bg-gradient-to-r from-yellow-500 via-cyan-500 to-emerald-400  px-3 py-2 rounded-xl ' : 'text-gray-400'}`}>
                            <link.icon className="h-6 w-6" />
                            <span>{link.title}</span>
                        </Link>
                    ))
                }

                <button onClick={() => signOut()} className={`flex items-start space-x-4 hover:scale-105 transition-all duration-200 text-gray-400 `}>
                    <LogOut className="h-6 w-6" />
                    <span>Logout</span>
                </button>

            </div>
        </div>
    )
}

export default Sidebar