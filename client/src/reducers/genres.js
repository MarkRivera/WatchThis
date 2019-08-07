import { SET_GENRES } from "../actions/types";

const initialState = {
	genres: null,
	genresLoading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_GENRES:
			return {
				...state,
				genres: payload.data,
				genresLoading: false
			};

		default:
			return state;
	}
}
