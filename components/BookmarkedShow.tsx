"use client"

import { Media } from '@/lib/types';
import React from 'react'
import MovieGrid from './MovieGrid';

interface BookmarkedShowProps {
    label: string;
    shows: Media[];
}

export default function BookmarkedShow({label, shows}: BookmarkedShowProps) {
    if (!shows.length)
        return <></>

    return (
        <MovieGrid label={label} medias={shows}/>
    )
}

