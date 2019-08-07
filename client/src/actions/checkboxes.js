import axios from "axios";
import {
	INIT_NEW_CHECKBOX,
	TOGGLE_CHECKBOX_TO_FALSE,
	TOGGLE_CHECKBOX_TO_TRUE,
	GET_PROFILE,
	PROFILE_ERROR
} from "./types";

import { getCurrentProfile } from "./profile";

export const checkboxesActions = (
	eventInfo = null,
	firstRender
) => async dispatch => {
	if (firstRender) {
		dispatch({ type: INIT_NEW_CHECKBOX, payload: eventInfo });
		return;
	}

	if (eventInfo.watched) {
		dispatch({ type: TOGGLE_CHECKBOX_TO_FALSE, payload: eventInfo });
		const body = {
			watched: false,
			movie: {
				id: eventInfo.id
			}
		};

		const config = {
			method: "post",
			url: "api/movies/watched",
			headers: {
				"Content-Type": "application/json"
			},
			data: body
		};
		try {
			let res = await axios(config);
			dispatch(getCurrentProfile());
		} catch (err) {
			throw new Error(err);
		}
	} else {
		dispatch({ type: TOGGLE_CHECKBOX_TO_TRUE, payload: eventInfo });
		const body = {
			watched: true,
			movie: eventInfo.data
		};

		const config = {
			method: "post",
			url: "api/movies/watched",
			headers: {
				"Content-Type": "application/json"
			},
			data: body
		};

		try {
			await axios(config);
			dispatch(getCurrentProfile());
		} catch (err) {
			throw new Error(err);
		}
	}
};
