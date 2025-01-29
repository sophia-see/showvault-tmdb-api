"use client"

import { Show } from '@/lib/types'
import React from 'react'
import Image from 'next/image';
import useDeviceSize from '@/hooks/use-device-size';

interface MoviePosterProps {
    movie:Show;
    isTrending?: boolean;
}

export default function MoviePoster({ movie, isTrending = false }:MoviePosterProps) {
    const { isTablet } = useDeviceSize();

    const poster = React.useMemo(() => {
        if (isTrending) {
            return isTablet ? movie.thumbnail.trending.large : movie.thumbnail.trending.small
        } else {
            return isTablet ? movie.thumbnail.regular.large : movie.thumbnail.regular.small
        }
    }, [movie, isTablet, isTrending])

    return (
        <div className='relative w-full h-full overflow-hidden'>
            <Image
                src={poster}
                alt="Description of the image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for responsiveness
                fill // Makes the image cover the container
                className="object-cover " // Ensures the image fits the container properly
                priority // Optional: Improves performance for critical images
            />
        </div>
    )
}
