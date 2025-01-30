import MovieGrid from '@/components/MovieGrid';
import { Show } from '@/lib/types';
import { getTVSeries } from '@/lib/utils';
import React from 'react'
import { fetchTVSeries } from '../api/data';

export default async function page() {
  const tvSeries = await fetchTVSeries();
  
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <MovieGrid label={"TV Series"} medias={tvSeries}/>
      </div>
    </div>
  );
}
