import React from 'react'
import { FaCirclePlay } from "react-icons/fa6";

export default function MoviePlayHover() {
    return (
        <div className='opacity-0 hover:opacity-100 flex absolute inset-0 items-center justify-center z-20 backdrop-brightness-50'>
            <div className='flex items-center gap-5 p-2 rounded-full bg-pure-white-25'>
                <FaCirclePlay color='white' size={30}/>
                <div className='text-pure-white text-heading-xs pr-4'>Play</div>
            </div>
        </div>
    )
}
