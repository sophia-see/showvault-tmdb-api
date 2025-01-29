"use client"

import { Show } from '@/lib/types';
import React from 'react'
import MovieBookmark from './MovieBookmark';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import SectionContainer from './SectionContainer';
import MoviePlayHover from './MoviePlayHover';

interface MovieRowProps {
    label: string;
    movies: Show[];
}

export default function MovieRow({label, movies}: MovieRowProps) {
    return (
        <SectionContainer label={label}>
            <div className='flex flex-nowrap overflow-x-scroll scrollbar-none gap-4 md:gap-10 pr-4 md:pr-6'>
                {movies.map((movie, index) => {
                    return (
                        <div className='flex-shrink-0 relative w-[240px] h-[140px] md:w-[470px] md:h-[230px] rounded-[8px] overflow-hidden cursor-pointer' key={index}>
                            <MoviePlayHover />
                            <MoviePoster movie={movie} isTrending={true}/>
                            <MovieBookmark movie={movie}/>
                            <div className='absolute z-20 bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-transparent to-black'>
                                <MovieDetails movie={movie} isTrending={true}/>
                            </div>
                        </div>
                    )
                })}            
            </div>
        </SectionContainer>
    )
}
