import { ADD_POSTER_CONFIG_TO_STORES } from "../actions/types";

const initialState = {
	url: null,
	poster_sizes: []
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_POSTER_CONFIG_TO_STORES:
			return {
				...state,
				url: payload.secure_url,
				poster_sizes: payload.poster_sizes
			};

		default:
			return state;
	}
}
