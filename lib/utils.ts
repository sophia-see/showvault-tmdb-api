import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import data from "@/app/data.json";
import { Media } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTrendingShows() {
  return data.filter(i => i.isTrending)
}

export function getRecommenededShows() {
  return data
}

export function getMatchedShows (search: string) {
  return data.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))
}

export function getMovies () {
  return data.filter(i => i.category == "Movie")
}

export function getTVSeries () {
  return data.filter(i => i.category == "TV Series")
}

export function shuffleMedia(medias: Media[]) {
  for (let i = medias.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [medias[i], medias[j]] = [medias[j], medias[i]]; // Swap elements
  }
  return medias;
}

export function filterInvalidMedias(medias: Media[]) {
  return medias.filter(i => (i.backdrop_path || i.poster_path) && (i.title || i.name || i.original_title || i.original_name ))
}