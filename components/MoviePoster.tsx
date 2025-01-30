"use client"

import { Media } from '@/lib/types'
import React from 'react'
import Image from 'next/image';
import { BASE_IMAGE_URL } from '@/lib/constants';

interface MoviePosterProps {
    media: Media;
}

export default function MoviePoster({ media }:MoviePosterProps) {
    const poster = media.poster_path ?? media.backdrop_path;

    return (
        <div className='relative w-full h-full overflow-hidden'>
            <Image
                src={`${BASE_IMAGE_URL}/${poster}`}
                alt="Description of the image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for responsiveness
                fill // Makes the image cover the container
                className="object-cover " // Ensures the image fits the container properly
                priority // Optional: Improves performance for critical images
                key={media.id}
            />
        </div>
    )
}
