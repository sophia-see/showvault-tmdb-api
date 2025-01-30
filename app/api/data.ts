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