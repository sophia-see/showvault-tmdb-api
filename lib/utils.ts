import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import data from "@/app/data.json";

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