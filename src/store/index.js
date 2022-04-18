import { configureStore, createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
	name: "root",
	initialState: {
		initialRedditLink: null,
		movies: [],
	},
	reducers: {
		setInitialRedditLink: (state, action) => {
			state.initialRedditLink = action.payload;
		},
		setMovies: (state, action) => {
			state.movies = action.payload;
		},
	},
});

export const { setInitialRedditLink, setMovies } = rootReducer.actions;

export const store = configureStore({
	reducer: rootReducer,
});
