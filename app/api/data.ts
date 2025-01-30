import { TMDB_API_URL } from "@/lib/constants";
import { Genre, Media } from "@/lib/types";
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
      const res = await fetch(`${TMDB_API_URL}/trending/all/day?language=en-US`, options)
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
      const resMovies = await fetch(`${TMDB_API_URL}/movie/top_rated?language=en-US&page=1`, options)
      const dataMovies = await resMovies.json();
      const formatMovies = dataMovies.results.map((item: Media) => ({
        ...item,
        media_type: "movie"
      }))

      const resTV = await fetch(`${TMDB_API_URL}/tv/top_rated?language=en-US&page=1`, options)
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

export async function fetchMediaSearch (search: string, page = "1") {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };
    

    try {
      const res = await fetch(`${TMDB_API_URL}/search/multi?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
      const data = await res.json();
      const filteredData = data.results.filter((i: Media) => i.media_type == "tv" || i.media_type == "movie");

      return {
        results: filterInvalidMedias(filteredData),
        hasNextPage: data.page < data.total_pages,
        hasPrevPage: data.page > 1
      }
      return filterInvalidMedias(filteredData);
    } catch (error) {
      console.log({error})
      return [];
    }
}

export async function fetchMovies (page = "1", genre: string | undefined) {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };

    try {
      let pathURL = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`

      if (genre)
        pathURL += `&with_genres=${genre}`

      const res = await fetch(`${TMDB_API_URL}${pathURL}`, options)
      const data = await res.json();
      const formattedData = data.results.map((item: Media) => ({
        ...item,
        media_type: "movie"
      })) as Media[]

      return {
        results: filterInvalidMedias(formattedData),
        hasNextPage: data.page < data.total_pages,
        hasPrevPage: data.page > 1
      }
    } catch (error) {
      console.log({error})
      return [];
    }
}

export async function fetchTVSeries (page = "1", genre: string | undefined) {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };

    try {
      let pathURL = `/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`

      if (genre)
        pathURL += `&with_genres=${genre}`

      const res = await fetch(`${TMDB_API_URL}${pathURL}`, options)
      const data = await res.json();
      const formattedData = data.results.map((item: Media) => ({
        ...item,
        media_type: "tv"
      })) as Media[]

      return {
        results: filterInvalidMedias(formattedData),
        hasNextPage: data.page < data.total_pages,
        hasPrevPage: data.page > 1
      }
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

  const results: Media[] = [];

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

export async function fetchGenres (type: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };

  const res = await fetch(`${TMDB_API_URL}/genre/${type}/list?language=en`, options)
  const data = await res.json();

  return data.genres as Genre[];
}