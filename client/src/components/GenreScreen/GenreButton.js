import React from "react";

function genreButton({ genres, onClick }) {
	return genres.map((genre, index) => {
		return (
			<div
				className="square"
				key={genre.id}
				id={genre.id}
				onClick={e => {
					onClick(e);
				}}
			>
				{genre.name}
			</div>
		);
	});
}

export default genreButton;
