import { ADD_POSTER_CONFIG_TO_STORES } from "./types";

export const getConfigLink = () => async dispatch => {
	try {
		const configLink = await fetch(
			"https://api.themoviedb.org/3/configuration?api_key=a6a4e825f844dc112dab513389c719fe"
		);
		const body = await configLink.json();

		let payload = {
			secure_url: body.images.secure_base_url,
			poster_sizes: body.images.poster_sizes
		};

		dispatch({
			type: ADD_POSTER_CONFIG_TO_STORES,
			payload: payload
		});
	} catch (err) {
		throw new Error(err);
	}
};
