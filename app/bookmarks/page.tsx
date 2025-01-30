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
import BookmarkedMedias from '@/components/BookmarkedMedias';

export default async function page() {
    const session = await auth.api.getSession({headers: await headers()});

    if (!session)
        return redirect("/login")

    return (
        <div className="px-4 md:px-6">
          <BookmarkedMedias session={session} />
        </div>
    )
}

