import { TMDB_API_URL } from "@/lib/constants";
import { Media } from "@/lib/types";
import { filterInvalidMedias, shuffleMedia } from "@/lib/utils";

export async function fetchTrending () {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };
    

    try {
      const res = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
      const data = await res.json();

      const filteredData = data.results.filter((i: Media) => i.media_type == "tv" || i.media_type == "movie") as Media[]

      return filterInvalidMedias(filteredData.slice(0, 10));
    } catch (error) {
      console.log({error})
      return [];
    }
}

export async function fetchRecommended () {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };
    

    try {
      const resMovies = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      const dataMovies = await resMovies.json();
      const formatMovies = dataMovies.results.map((item: Media) => ({
        ...item,
        media_type: "movie"
      }))

      const resTV = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
      const dataTV = await resTV.json();
      const formatTV = dataTV.results.map((item: Media) => ({
        ...item,
        media_type: "tv"
      }))

      const shuffledMedia = shuffleMedia([...formatMovies, ...formatTV])

      return filterInvalidMedias(shuffledMedia);
    } catch (error) {
      console.log({error})
      return [];
    }
}

export async function fetchMediaSearch (search: string) {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };
    

    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=true&language=en-US&page=1`, options)
      const data = await res.json();
      const filteredData = data.results.filter((i: Media) => i.media_type == "tv" || i.media_type == "movie")
      return filterInvalidMedias(filteredData);
    } catch (error) {
      console.log({error})
      return [];
    }
}

export async function fetchMovies () {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };

    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      const data = await res.json();
      const formattedData = data.results.map((item: Media) => ({
        ...item,
        media_type: "movie"
      })) as Media[]

      return filterInvalidMedias(formattedData);
    } catch (error) {
      console.log({error})
      return [];
    }
}

export async function fetchTVSeries () {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };

    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      const data = await res.json();
      const formattedData = data.results.map((item: Media) => ({
        ...item,
        media_type: "tv"
      })) as Media[]

      return filterInvalidMedias(formattedData);
    } catch (error) {
      console.log({error})
      return [];
    }
}

const batchFetch = async (ids: string[], type: 'movie' | 'tv', batchSize: number = 10) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };

  const results: any[] = [];

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const fetchPromises = batch.map(id => fetch(`${TMDB_API_URL}/${type}/${id}?language=en-US`, options));

    // Wait for all requests in this batch to resolve
    const batchResults = await Promise.all(fetchPromises);
    const data = await Promise.all(batchResults.map(res => res.json()));
    const formatData = data.map(i => ({
      ...i,
      media_type: type
    }))
    
    results.push(...formatData); // Add the results from the batch
  }

  return results;
};


export async function fetchMoviesById (ids: string[]) {
  return await batchFetch(ids, 'movie');
}

export async function fetchTVSeriesById (ids: string[]) {
  return await batchFetch(ids, 'tv');

}