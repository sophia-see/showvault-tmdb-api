import MovieGrid from '@/components/MovieGrid';
import { Show } from '@/lib/types';
import { getMovies } from '@/lib/utils';
import React from 'react'

export default function page() {
  const movies = getMovies() as Show[];
  
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        {/* <MovieGrid label={"Movies"} movies={movies}/> */}
      </div>
    </div>
  );
}
