"use client"

import { useAppContext } from '@/app/contexts/AppContext';
import { authClient } from '@/lib/auth-client'
import { updateBookmark } from '@/lib/prisma-server';
import { Media } from '@/lib/types'
import { redirect } from 'next/navigation';
import React from 'react'
import { FaRegBookmark } from 'react-icons/fa6'
import { IoMdBookmark } from "react-icons/io";

interface MovieBookmarkProps {
    media: Media;
}

export default function MovieBookmark({media}: MovieBookmarkProps) {
    const session = authClient.useSession();
    const {bookmarks, setBookmarks} = useAppContext();
    const isBookmarked = !!bookmarks.find(i => i.id == media.id.toString());

    const handleBookmark = async (media: Media) => {
        if (session.data) {
            const newBookmarks = await updateBookmark({
                email: session.data?.user.email as string, 
                id: media.id.toString(), 
                isBookmarked,
                media_type: media.media_type
            })
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
                            onClick={() => handleBookmark(media)}
                        />
                    :   <FaRegBookmark 
                            className='
                                bg-dark-blue-50 p-[10px] w-[34px] h-[34px] flex justify-center items-center rounded-full cursor-pointer overflow-visible hover:bg-white hover:fill-black
                            '
                            onClick={() => handleBookmark(media)}
                        />
                }
            </div>
        </div>
    )
}
