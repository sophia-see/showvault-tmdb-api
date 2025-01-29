import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import { Show } from '@/lib/types';
import { getMovies, getTVSeries } from '@/lib/utils';
import BookmarkedShow from '@/components/BookmarkedShow';

export default async function page() {
    const session = await auth.api.getSession({headers: await headers()});

    if (!session)
        return redirect("/login")

    const movies = getMovies() as Show[];
    const tvSeries = getTVSeries() as Show[];

    return (
        <div className="px-4 md:px-6">
            <div className="flex flex-col gap-6">
                {/* <BookmarkedShow label={"Bookmarked Movies"} shows={movies}/>
                <BookmarkedShow label={"Bookmarked TV Series"} shows={tvSeries}/> */}
            </div>
        </div>
    )
}
