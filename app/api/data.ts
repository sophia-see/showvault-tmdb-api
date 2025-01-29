import { Media } from "@/lib/types";
import { shuffleMedia } from "@/lib/utils";

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

      return filteredData.slice(0, 10);
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

      const resTV = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
      const dataTV = await resTV.json();

      const shuffledMedia = shuffleMedia([...(dataMovies.results), ...(dataTV.results)])

      return shuffledMedia;
    } catch (error) {
      console.log({error})
      return [];
    }
}
export async function fetchMovieById (movieId = 939243) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
      };
      

      try {
        const res = await  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
        const data = await res.json();

        return data;
      } catch (error) {
        console.log({error})
        return null;
      }
}

export async function fetchPopular () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=PH', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}