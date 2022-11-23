import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, base_url } from "../../Utils/Constants/Constants";
import axios from 'axios';
import { axiosTMDB } from '../../Utils/Axios/axios'
import { GenreList,Originals, Trending,TrendingTv,TrendingMovies, Action,Comedy, Horror,Crime  } from '../../Utils/Constants/Url'


const initialState = {
    genresLoaded: false,
    genres: [],
    netflixOriginals: [],
    trending: [],
    actionCat: [],
    comedyCat: [],
    horrorCat: [],
    crimeCat: [],
    dataByGenre: [],
    myList:[],
    
}


export const getGenres = createAsyncThunk("Netflix/genres", async () => {
    const { data: { genres } } = await axiosTMDB.get(
        `${GenreList}`
    )
    return genres
});

export const fetchMovies = createAsyncThunk("Netflix/trending", async ({ url }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState();
    console.log('url', url)
    return getRawData(`${url}`, genres)
})

export const fetchMoviesByGenre = createAsyncThunk("Netflix/moviesbygenre", async ({ genre, type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState();
    return getRawData(`${base_url}discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres)
})

const getRawData = async (api, genres) => {
    const Movies = [];
    const { data: { results } } = await axiosTMDB.get(`${api}`);
    console.log("getrawmovies", results);
    createArrayFromRawData(results, Movies, genres);

    return Movies
}

const createArrayFromRawData = (res, Movies, genres) => {

    res.forEach((obj) => {
        const movieGenres = [];
        obj.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        })
        if (obj.backdrop_path) {
            Movies.push({
                id: obj.id,
                name: obj?.original_name ? obj.original_name : obj.original_title,
                description: obj.overview,
                image: obj.backdrop_path,
                genres: movieGenres.slice(0, 3),
            })
        }
    })
}

export const getUserLikedMovies = createAsyncThunk("Netflix/getliked", async (email)=>{
    const {data:{movie}} = await axios.get(`https://my-netflix-cloneapp.herokuapp.com/api/user/liked/${email}`);
    return movie
})

export const removeFromLikedMovies = createAsyncThunk("Netflix/deleteliked", async ({email,movieId})=>{
    const {data:{movies}} = await axios.put(`https://my-netflix-cloneapp.herokuapp.com/api/user/delete`,{email,movieId});
    return movies
})



const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            if (action.meta.arg.url === Originals) {
                state.netflixOriginals = action.payload;
            }
            if (action.meta.arg.url === Trending) {
                state.trending = action.payload
            }
            if (action.meta.arg.url === Action) {
                state.actionCat = action.payload
            }
            if (action.meta.arg.url === Comedy) {
                state.comedyCat = action.payload
            }
            if (action.meta.arg.url === Horror) {
                state.horrorCat = action.payload
            }
            if (action.meta.arg.url === Crime) {
                state.crimeCat = action.payload
            }
            if (action.meta.arg.url === TrendingTv) {
                state.dataByGenre = action.payload
            }
            if (action.meta.arg.url === TrendingMovies) {
                state.dataByGenre = action.payload
            }

        })
        builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
            state.dataByGenre = action.payload;
        })
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.myList = action.payload;
        })
        builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
            state.myList = action.payload;
        })
    },
})

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});