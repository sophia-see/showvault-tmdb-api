// "use client"

// import { useAppContext } from '@/app/contexts/AppContext';
// import { Show } from '@/lib/types';
// import React from 'react'
// import MovieGrid from './MovieGrid';

// interface BookmarkedShowProps {
//     label: string;
//     shows: Show[];
// }

// export default function BookmarkedShow({label, shows}: BookmarkedShowProps) {
//     const { bookmarks } = useAppContext();
//     const bookmarkedShows = shows.filter(i => bookmarks.includes(i.title));

//     if (!bookmarkedShows.length)
//         return <></>

//     return (
//         <></>
//         // <MovieGrid label={label} movies={bookmarkedShows}/>
//     )
// }


import React from 'react'

export default function BookmarkedShow() {
  return (
    <div>BookmarkedShow</div>
  )
}
