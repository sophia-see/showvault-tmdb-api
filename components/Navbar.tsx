"use client" // This ensures the component runs on the client side

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { getSession, signOut } from '@/lib/auth-server'
import { MdMovie } from 'react-icons/md'
import { IoGrid } from "react-icons/io5";
import { RiFilmFill } from "react-icons/ri";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { IoMdBookmark } from "react-icons/io";
import { IoPersonCircleOutline  } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { getUserBookmarks } from '@/lib/prisma-server'
import { useAppContext } from '@/app/contexts/AppContext'
import { Session, User } from 'better-auth'
import useDeviceSize from '@/hooks/use-device-size'

export interface UserSession {
    session: Session;
    user: User;
}

export default function Navbar() {
    const pathname = usePathname();
    const {setBookmarks} = useAppContext();
    const {isTablet, isDesktop} = useDeviceSize();

    const [session, setSession] = useState<UserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isHome = pathname == "/"
    const isMovies = pathname == "/movies"
    const isTVShows = pathname == "/tv-shows"
    const isBookmarks = pathname == "/bookmarks"

    // Fetch session data
    useEffect(() => {
        const fetchSession = async () => {
            setIsLoading(true);
            const sessionData = await getSession();
            setSession(sessionData as UserSession);
            setIsLoading(false);
        };

        fetchSession();
    }, []);

    
    useEffect(() => {
        const fetchBookmarks = async () => {
            const bookmarkedShows = await getUserBookmarks({email: session?.user.email ?? ""});
            setBookmarks(bookmarkedShows)
        }
        fetchBookmarks();
    }, [session?.user.email, setBookmarks]);

    // Conditionally hide navbar on login/signup pages
    if (pathname === "/login" || pathname === "/sign-up") {
        return null;
    }

    // Handle sign-out
    const handleSignOut = async () => {
        await signOut();
        setSession(null)
        redirect("/login");
    };

    return (
        <div className='md:p-[24px] lg:h-[100vh] lg:fixed lg:top-0 lg:left-0'>
            <nav className='w-full h-full bg-semi-dark-blue px-4 md:rounded-[10px] md:mx-auto'>
                <div 
                    className='
                        flex items-center justify-between mx-auto max-w-4xl h-16
                        lg:flex-col lg:h-full lg:gap-[74px] lg:py-[35px]
                    '
                >
                    <Link href={"/"} className='flex items-center gap-2'>
                        <MdMovie className="fill-pure-red" size={28}/>
                    </Link>
                    <ul 
                        className='
                            flex items-center gap-6 md:gap-8 lg:gap-10
                            lg:flex-col
                        '
                    >
                        <li>
                            <Link href={"/"}><IoGrid size={isTablet ? 24 : 18} className={`${isHome ? "fill-pure-white" : "fill-greyish-blue hover:fill-pure-red"}`}/></Link>
                        </li>
                        <li>
                            <Link href={"/movies"}><RiFilmFill size={isTablet ? 24 : 18} className={`${isMovies ? "fill-pure-white" : "fill-greyish-blue hover:fill-pure-red"}`}/></Link>
                        </li>
                        <li>
                            <Link href={"/tv-shows"}><TbDeviceTvOldFilled size={isTablet ? 24 : 18} className={`${isTVShows ? "fill-pure-white" : "fill-greyish-blue hover:fill-pure-red"}`}/></Link>
                        </li>
                        <li>
                            <Link href={"/bookmarks"}><IoMdBookmark size={isTablet ? 24 : 18} className={`${isBookmarks ? "fill-pure-white" : "fill-greyish-blue hover:fill-pure-red"}`}/></Link>
                        </li>
                    </ul>
                    <div className='flex items-center lg:mt-auto'>
                        <DropdownMenu>
                            <DropdownMenuTrigger><IoPersonCircleOutline size={24} /></DropdownMenuTrigger>
                            {isLoading
                                ?   <></> 
                                :   <DropdownMenuContent side={isDesktop ? "right" :"bottom"} align={isDesktop ? undefined : 'end'} sideOffset={isDesktop ? 20 : 10} className='right-10 bg-greyish-blue text-pure-white border-0'>
                                        
                                            {session 
                                                ?   <div className='w-full cursor-pointer' onClick={handleSignOut}>
                                                        <DropdownMenuItem className='w-full cursor-pointer'>
                                                            Log Out
                                                        </DropdownMenuItem> 
                                                    </div>
                                                :   <Link href={"/login"} className='w-full cursor-pointer'>
                                                        <DropdownMenuItem className='w-full cursor-pointer'>
                                                            Log in
                                                        </DropdownMenuItem>
                                                    </Link>
                                                
                                            }
                                        
                                    </DropdownMenuContent>
                                }
                        </DropdownMenu>
                    </div>
                </div>
            </nav>            
        </div>
    );
}
