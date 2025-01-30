import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import { Show } from '@/lib/types';
import { getMovies, getTVSeries } from '@/lib/utils';
import BookmarkedShow from '@/components/BookmarkedShow';
import { getUserBookmarks } from '@/lib/prisma-server';
import { fetchMoviesById, fetchTVSeriesById } from '../api/data';
import { Bookmark } from '@prisma/client';

export default async function page() {
    const session = await auth.api.getSession({headers: await headers()});

    if (!session)
        return redirect("/login")

    const userBookmarks = await getUserBookmarks({email: session.user.email ?? ""});
    const {movieIds, tvSeriesIds} = userBookmarks.reduce((prev: {movieIds: string[], tvSeriesIds: string[]}, curr: Bookmark) => {
      if (curr.media_type == "tv") prev.tvSeriesIds.push(curr.id)
      else prev.movieIds.push(curr.id)

      return prev;
    }, {movieIds: [], tvSeriesIds:[]});

    const bookmarkedMovies = await fetchMoviesById(movieIds);
    const bookmarkedTVSeries = await fetchTVSeriesById(tvSeriesIds);

    return (
        <div className="px-4 md:px-6">
          <div className="flex flex-col gap-6">
              <BookmarkedShow label={"Bookmarked Movies"} shows={bookmarkedMovies}/>
              <BookmarkedShow label={"Bookmarked TV Series"} shows={bookmarkedTVSeries}/>
          </div>
        </div>
    )
}

