import axios from "axios";
import { SET_GENRES } from "./types";

export const getGenres = bool => async dispatch => {
	const myStorage = window.localStorage;
	const isGenresLoaded = myStorage.getItem("isGenresLoaded");
	let genres = await axios.get("/api/genres");

	if (!isGenresLoaded) {
		try {
			console.log(genres);

			dispatch({
				type: SET_GENRES,
				payload: genres
			});

			myStorage.setItem("isGenresLoaded", true);
		} catch (err) {
			console.error(err.response.data);
		}
	} else {
		dispatch({
			type: SET_GENRES,
			payload: genres
		});
	}
};
