import {API_KEY} from './Constants'

export const GenreList = `genre/movie/list?api_key=${API_KEY}`
export const Originals = `discover/tv?api_key=${API_KEY}&with_networks=213`
export const Trending = `trending/all/week?api_key=${API_KEY}`
export const Action = `discover/movie?api_key=${API_KEY}&with_genres=28`
export const Comedy = `discover/movie?api_key=${API_KEY}&with_genres=35`
export const Horror = `discover/movie?api_key=${API_KEY}&with_genres=27`
export const Crime = `discover/movie?api_key=${API_KEY}&with_genres=80`

export const TrendingTv = `trending/tv/week?api_key=${API_KEY}`
export const TrendingMovies = `trending/movie/week?api_key=${API_KEY}`