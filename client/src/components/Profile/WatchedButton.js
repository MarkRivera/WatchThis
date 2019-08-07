import React, { Fragment } from "react";

function WatchedButton({ isWatched, onChange, movieId, eventInfo }) {
	return (
		<Fragment>
			<input
				type="checkbox"
				onChange={e => onChange(e, eventInfo)}
				data-id={movieId}
				checked={isWatched}
			/>{" "}
			<label> {` Movie Watched`} </label>
		</Fragment>
	);
}

export default WatchedButton;
