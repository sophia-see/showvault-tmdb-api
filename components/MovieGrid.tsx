"use client"

import { Genre, Media } from '@/lib/types';
import React from 'react'
import MovieBookmark from './MovieBookmark';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import SectionContainer from './SectionContainer';
import MoviePlayHover from './MoviePlayHover';

interface MovieGridProps {
    label: string;
    medias: Media[];
    hasGenrePicker?: boolean;
    movieGenres?: Genre[];
    selectedGenres?: string[];
}

export default function MovieGrid({label, medias, hasGenrePicker = false, movieGenres, selectedGenres}: MovieGridProps) {
    return (
        <SectionContainer label={label} hasGenrePicker={hasGenrePicker} movieGenres={movieGenres} selectedGenres={selectedGenres}>
            <div 
                className='
                    grid 
                    grid-cols-[repeat(auto-fill,_minmax(164px,_1fr))] 
                    md:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] 
                    xl:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] 
                    gap-[15px] md:gap-[29px]
                '
            >
                {medias.map((media, index) => {
                    return (
                        <div className='flex flex-col gap-2 cursor-pointer' key={index}>
                            <div 
                                className='
                                    flex-shrink-0 
                                    relative 
                                    w-full 
                                    h-[280px] 
                                    md:h-[320px] 
                                    xl:h-[474px] 
                                    rounded-[8px] 
                                    overflow-hidden
                                ' 
                                key={index}
                            >
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
