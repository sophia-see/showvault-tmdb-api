import MovieGrid from '@/components/MovieGrid';
import { Media, Show } from '@/lib/types';
import { getMovies } from '@/lib/utils';
import React from 'react'
import { fetchMovies } from '../api/data';

export default async function page() {
  const movies = await fetchMovies() as Media[];
  
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <MovieGrid label={"Movies"} medias={movies}/>
      </div>
    </div>
  );
}