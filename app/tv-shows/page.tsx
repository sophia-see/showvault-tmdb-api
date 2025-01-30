import MovieGrid from '@/components/MovieGrid';
import React from 'react'
import { fetchGenres, fetchTVSeries } from '../api/data';
import { QueryList } from '@/lib/types';
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

  const {results: tvSeries, hasNextPage, hasPrevPage} = await fetchTVSeries(page, genre) as QueryList;
  const tvGenres = await fetchGenres("tv");
  
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <MovieGrid label={"TV Series"} medias={tvSeries} hasGenrePicker={true} movieGenres={tvGenres} selectedGenres={selectedGenres}/>
        <div className='ml-auto'>
          <MoviePagination hasPrevPage={hasPrevPage} hasNextPage={hasNextPage}/>
        </div>
      </div>
    </div>
  );
}
