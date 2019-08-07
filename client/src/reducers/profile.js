import {
	GET_PROFILE,
	PROFILE_ERROR,
	ADD_GENRES_TO_STATE,
	ADD_MOVIES_TO_STATE,
	ADD_POSTERS_URL_TO_STORE,
	LOGOUT
} from "../actions/types";

const initialState = {
	info: null,
	genres: [],
	genresGreaterThanZero: false,
	moviesAlreadySeen: [],
	seenMoviesGreaterThanZero: false,
	chosenMovies: {},
	chosenMoviesArrived: false,
	profileLoading: true
	// posterLoading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				info: payload.user,
				genres: payload.genres,
				genresGreaterThanZero: payload.genresGreaterThanZero,
				moviesAlreadySeen: payload.movies,
				profileLoading: false
			};

		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				profileLoading: false
			};

		case ADD_GENRES_TO_STATE:
			return {
				...state,
				genres: payload,
				genresGreaterThanZero: payload.genresGreaterThanZero
			};

		case ADD_MOVIES_TO_STATE:
			return {
				...state,
				chosenMovies: payload,
				chosenMoviesArrived: true
			};

		case LOGOUT:
			return {
				...state,
				...initialState
			};

		// case ADD_POSTERS_URL_TO_STORE:
		// 	return {
		// 		...state,
		// 		posters: [...state.posters, payload],
		// 		posterLoading: false
		// 	};

		default:
			return state;
	}
}
