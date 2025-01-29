"use client"

import { useAppContext } from '@/app/contexts/AppContext';
import { authClient } from '@/lib/auth-client'
import { updateBookmark } from '@/lib/prisma-server';
import { Show } from '@/lib/types'
import { redirect } from 'next/navigation';
import React from 'react'
import { FaRegBookmark } from 'react-icons/fa6'
import { IoMdBookmark } from "react-icons/io";

interface MovieBookmarkProps {
    movie: Show
}

export default function MovieBookmark({movie}: MovieBookmarkProps) {
    const session = authClient.useSession();
    const {bookmarks, setBookmarks} = useAppContext();
    const isBookmarked = bookmarks.includes(movie.title);

    const handleBookmark = async (movie: Show) => {
        if (session.data) {
            const newBookmarks = await updateBookmark({email: session.data?.user.email as string, show: movie.title, isBookmarked})
            setBookmarks(newBookmarks)
        }
        else
            redirect("/login")
    }
    
    return (
        <div className='absolute top-0 right-0 m-2 flex items-center justify-center z-20'>
            <div>
                {/* {isBookmarked ? <IoMdBookmark size={14} /> : <FaRegBookmark size={14} />} */}

                {isBookmarked 
                    ?   <IoMdBookmark
                            className='
                                bg-dark-blue-50 p-[10px] w-[34px] h-[34px] flex justify-center items-center rounded-full cursor-pointer overflow-visible
                            '
                            onClick={() => handleBookmark(movie)}
                        />
                    :   <FaRegBookmark 
                            className='
                                bg-dark-blue-50 p-[10px] w-[34px] h-[34px] flex justify-center items-center rounded-full cursor-pointer overflow-visible hover:bg-white hover:fill-black
                            '
                            onClick={() => handleBookmark(movie)}
                        />
                }
            </div>
        </div>
    )
}
