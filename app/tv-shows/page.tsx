import MovieGrid from '@/components/MovieGrid';
import React from 'react'
import { fetchTVSeries } from '../api/data';
import { QueryList } from '@/lib/types';
import MoviePagination from '@/components/MoviePagination';

interface PageProps {
  searchParams?: Promise<{
      term?: string;
      page?: string;
  }>;
}

export default async function page({ searchParams }: Readonly<PageProps>) {
  const page = (await searchParams)?.page || '1';

  const {results: tvSeries, hasNextPage, hasPrevPage} = await fetchTVSeries(page) as QueryList;
  
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <MovieGrid label={"TV Series"} medias={tvSeries}/>
        <div className='ml-auto'>
          <MoviePagination hasPrevPage={hasPrevPage} hasNextPage={hasNextPage}/>
        </div>
      </div>
    </div>
  );
}
