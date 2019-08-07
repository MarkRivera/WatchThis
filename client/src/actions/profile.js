import axios from "axios";

import {
	GET_PROFILE,
	PROFILE_ERROR,
	ADD_GENRES_TO_STATE,
	ADD_MOVIES_TO_STATE,
	ADD_POSTERS_URL_TO_STORE
} from "./types";

export const createProfile = genres => async dispatch => {
	let body = {
		genres: genres
	};

	let config = {
		method: "post",
		url: "api/profile",
		headers: {
			"Content-Type": "application/json"
		},
		data: body
	};

	try {
		await axios(config);
		let res = await dispatch(getCurrentProfile());

		return res;
	} catch (err) {
		throw new Error(err);
	}
};

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get("api/profile/me");

		res.data.genresGreaterThanZero = res.data.genres.length > 0 ? true : false;

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		return res.data;
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const addGenreToProfile = selected => async dispatch => {
	let body = JSON.stringify(selected);

	let config = {
		method: "post",
		url: "api/movies/",
		headers: {
			"Content-Type": "application/json"
		},
		data: body
	};

	try {
		const res = await axios(config);
		console.log(res.status, "Genres added to profile");
		dispatch({
			type: ADD_GENRES_TO_STATE,
			payload: selected
		});
	} catch (err) {
		throw new Error(err);
	}

	dispatch(addMoviesToState(selected));
};

export const addMoviesToState = genres => async dispatch => {
	let body = genres;

	let config = {
		method: "post",
		url: "api/movies/getMovies",
		headers: {
			"Content-Type": "application/json"
		},
		data: body
	};

	try {
		let res = await axios(config);

		dispatch({
			type: ADD_MOVIES_TO_STATE,
			payload: res.data
		});

		return res;
	} catch (err) {
		throw new Error(err);
	}
};

export const getMoviePosters = (movie, config) => async dispatch => {
	let moviePostersConfig = {
		method: "get",
		url: `${config.url}${config.poster_sizes[4]}${movie.results.poster_path}`
	};

	try {
		const posterImage = await fetch(moviePostersConfig.url);
		const res = await posterImage;

		dispatch({
			type: ADD_POSTERS_URL_TO_STORE,
			payload: res.url
		});
	} catch (err) {
		throw new Error(err);
	}
};
