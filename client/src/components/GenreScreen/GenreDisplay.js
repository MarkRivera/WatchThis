import React from "react";
import "./GenreDisplay.css";

function GenreDisplay({ selected }) {
	return (
		<div className="text-light row">
			The genres you've selected:{" "}
			{selected.map(genre => {
				return `${genre.name}, `;
			})}
		</div>
	);
}

export default GenreDisplay;
