"use client"

import { Media } from '@/lib/types';
import React from 'react'
import MovieBookmark from './MovieBookmark';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import SectionContainer from './SectionContainer';
import MoviePlayHover from './MoviePlayHover';

interface MovieRowProps {
    label: string;
    medias: Media[];
}

export default function MovieRow({label, medias}: MovieRowProps) {
    return (
        <SectionContainer label={label}>
            <div className='flex flex-nowrap overflow-x-scroll scrollbar-none gap-4 md:gap-10 pr-4 md:pr-6'>
                {medias.map((media, index) => {
                    return (
                        <div 
                            className='
                                flex-shrink-0 
                                relative 
                                w-[240px] h-[380px] 
                                md:w-[320px] md:h-[480px]
                                lg:w-[400px] lg:h-[580px]
                                rounded-[8px] 
                                overflow-hidden cursor-pointer
                            ' 
                            key={index}
                        >
                            <MoviePlayHover />
                            <MoviePoster media={media}/>
                            <MovieBookmark media={media}/>
                            <div className='absolute z-20 bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-transparent to-black'>
                                <MovieDetails media={media} isTrending={true}/>
                            </div>
                        </div>
                    )
                })}            
            </div>
        </SectionContainer>
    )
}
