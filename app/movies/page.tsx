import MovieGrid from '@/components/MovieGrid';
import { Media, QueryList } from '@/lib/types';
import React from 'react'
import { fetchMovies } from '../api/data';
import MoviePagination from '@/components/MoviePagination';

interface PageProps {
  searchParams?: Promise<{
      term?: string;
      page?: string;
  }>;
}

export default async function page({ searchParams }: Readonly<PageProps>) {
  const page = (await searchParams)?.page || '1';

  const {results: movies, hasNextPage, hasPrevPage} = await fetchMovies(page) as QueryList;
  
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <MovieGrid label={"Movies"} medias={movies}/>
        <div className='ml-auto'>
          <MoviePagination hasPrevPage={hasPrevPage} hasNextPage={hasNextPage}/>
        </div>
      </div>
    </div>
  );
}