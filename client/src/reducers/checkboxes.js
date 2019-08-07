import {
	INIT_NEW_CHECKBOX,
	TOGGLE_CHECKBOX_TO_FALSE,
	TOGGLE_CHECKBOX_TO_TRUE
} from "../actions/types";

const initialValue = {};

export default function(state = initialValue, action) {
	const { type, payload } = action;

	switch (type) {
		case INIT_NEW_CHECKBOX:
			return {
				...state,
				[payload.id]: payload.watched
			};
		case TOGGLE_CHECKBOX_TO_FALSE:
			return {
				...state,
				[payload.id]: payload.watched
			};

		case TOGGLE_CHECKBOX_TO_TRUE:
			return {
				...state,
				[payload.id]: payload.watched
			};
		default:
			return state;
	}
}
