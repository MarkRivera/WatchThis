import React, { Fragment } from "react";
import GenreUpdate from "./GenreUpdate";
import "./UserDisplay.css";

function UserDisplay({ user: { avatar, name }, genres }) {
	let genreNames = genres.map(element => element.name);
	return (
		<Fragment>
			<section className="user-container">
				<img src={avatar} alt={`of ${name}`} />
				<div className="user-info">
					<h1>{name}</h1>
					<h4>Genres: {genreNames.join(", ")}</h4>
					<GenreUpdate />
				</div>
			</section>
		</Fragment>
	);
}

export default UserDisplay;
