"use client"
import React, { ReactNode } from 'react'
import { MovieGenre } from './MovieGenre';
import { Genre } from '@/lib/types';

interface SectionContainerProps {
    label: string;
    children: ReactNode;
    hasGenrePicker?: boolean;
    movieGenres?: Genre[];
    selectedGenres?: string[];
}

export default function SectionContainer({label, children, hasGenrePicker = false, movieGenres, selectedGenres}: SectionContainerProps) {
    return (
        <div className='flex flex-col gap-4 md:gap-6'>
            <div className='flex justify-between items-center'>
                <span className='font-light text-[20px] md:text-heading-l tracking-[-0.31px]'>{label}</span>
                <MovieGenre movieGenres={movieGenres} selectedGenres={selectedGenres}/>
            </div>
            {children}
        </div>
    )
}
