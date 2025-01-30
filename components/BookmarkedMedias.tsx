"use client";

import { fetchMoviesById, fetchTVSeriesById } from "@/app/api/data";
import { useAppContext } from "@/app/contexts/AppContext";
import BookmarkedShow from "@/components/BookmarkedShow";
import { Media } from "@/lib/types";
import { Bookmark } from "@prisma/client";
import { useEffect, useState } from "react";

export default function BookmarkedMedias() {
    const { bookmarks } = useAppContext();
    const [bookmarkedMovies, setBookmarkedMovies] = useState<Media[]>([]);
    const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState<Media[]>([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const { movieIds, tvSeriesIds } = bookmarks.reduce(
                (
                    prev: { movieIds: string[]; tvSeriesIds: string[] },
                    curr: Bookmark
                ) => {
                    if (curr.media_type == "tv") prev.tvSeriesIds.push(curr.id);
                    else prev.movieIds.push(curr.id);
                    return prev;
                },
                { movieIds: [], tvSeriesIds: [] }
            );

            try {
                // setLoading(true); // Set loading state to true while fetching data
                // Fetch movies and TV series concurrently
                const [movies, tvSeries] = await Promise.all([
                    fetchMoviesById(movieIds),
                    fetchTVSeriesById(tvSeriesIds),
                ]);

                setBookmarkedMovies(movies ?? []); // Set fetched movies
                setBookmarkedTVSeries(tvSeries ?? []); // Set fetched TV series
            } catch (error) {
                console.error("Error fetching bookmarked media:", error);
            } finally {
                // setLoading(false); // Set loading state to false after data is fetched
            }
        };

        if (bookmarks.length > 0) {
            fetchBookmarks(); // Fetch bookmarks if bookmarks array is not empty
        } else {
            // Reset the state if no bookmarks are present (e.g., if the last one is removed)
            setBookmarkedMovies([]);
            setBookmarkedTVSeries([]);
        }
    }, [bookmarks]); // Only refetch when bookmarks change

    return (
        <div className="flex flex-col gap-6">
            <BookmarkedShow
                label={"Bookmarked Movies"}
                shows={bookmarkedMovies}
            />
            <BookmarkedShow
                label={"Bookmarked TV Series"}
                shows={bookmarkedTVSeries}
            />
        </div>
    );
}
