"use client"

import { Media } from '@/lib/types';
import React from 'react'
import MovieBookmark from './MovieBookmark';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import SectionContainer from './SectionContainer';
import MoviePlayHover from './MoviePlayHover';

interface MovieGridProps {
    label: string;
    medias: Media[];
}

export default function MovieGrid({label, medias}: MovieGridProps) {
    return (
        <SectionContainer label={label}>
            <div className='grid grid-cols-[repeat(auto-fill,_minmax(164px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-[15px] md:gap-[29px]'>
                {medias.map((media, index) => {
                    return (
                        <div className='flex flex-col gap-2 cursor-pointer' key={index}>
                            <div className='flex-shrink-0 relative w-full h-[110px] md:h-[140px] lg:h-[174px] rounded-[8px] overflow-hidden' key={index}>
                                <MoviePlayHover />
                                <MoviePoster media={media} />
                                <MovieBookmark media={media}/>
                            </div> 
                            <div className='flex flex-col gap-1'>
                                <MovieDetails media={media} />
                            </div>                        
                        </div>
                    )
                })}            
            </div>
        </SectionContainer>
    )
}
