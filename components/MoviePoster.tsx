"use client"

import { Media } from '@/lib/types'
import React from 'react'
import Image from 'next/image';
import useDeviceSize from '@/hooks/use-device-size';
import { BASE_IMAGE_URL } from '@/lib/constants';

interface MoviePosterProps {
    media: Media;
}

export default function MoviePoster({ media }:MoviePosterProps) {
    return (
        <div className='relative w-full h-full overflow-hidden'>
            <Image
                src={`${BASE_IMAGE_URL}/${media.poster_path}`}
                alt="Description of the image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for responsiveness
                fill // Makes the image cover the container
                className="object-cover " // Ensures the image fits the container properly
                priority // Optional: Improves performance for critical images
            />
        </div>
    )
}
