import MovieGrid from '@/components/MovieGrid';
import { QueryList } from '@/lib/types';
import React from 'react'
import { fetchGenres, fetchMovies } from '../api/data';
import MoviePagination from '@/components/MoviePagination';

interface PageProps {
  searchParams?: Promise<{
      term?: string;
      page?: string;
      genre?: string;
  }>;
}

export default async function page({ searchParams }: Readonly<PageProps>) {
  const page = (await searchParams)?.page || '1';
  const genre = (await searchParams)?.genre ?? undefined;
  const selectedGenres = genre ? decodeURI(genre).split(" OR ") : [];

  const {results: movies, hasNextPage, hasPrevPage} = await fetchMovies(page, genre) as QueryList;
  const movieGenres = await fetchGenres("movie");

  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <MovieGrid label={"Movies"} medias={movies} hasGenrePicker={true} movieGenres={movieGenres} selectedGenres={selectedGenres}/>
        <div className='ml-auto'>
          <MoviePagination hasPrevPage={hasPrevPage} hasNextPage={hasNextPage}/>
        </div>
      </div>
    </div>
  );
}