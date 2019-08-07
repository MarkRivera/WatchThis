import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import WatchedButton from "./WatchedButton";
import { checkboxesActions } from "../../actions/checkboxes";
import { getCurrentProfile } from "../../actions/profile";
import "./MovieCard.css";

function MovieCard({
	movies,
	checkboxesActions,
	checkboxes,
	getCurrentProfile
}) {
	const [firstRender, changeFirstRender] = useState(true);

	useEffect(() => {
		changeFirstRender(false);
	}, []);

	const onChange = e => {
		let eventInfo = {
			id: e.nativeEvent.target.dataset.id,
			watched: !e.nativeEvent.target.checked
		};

		checkboxesActions(eventInfo, firstRender);
	};

	const allMovies = movies.map(movie => {
		let date = new Date(movie.date_watched);
		// let year = date.getFullYear();

		let eventInfo = {
			id: movie._id,
			watched: true
		};
		if (firstRender) {
			checkboxesActions(eventInfo, firstRender);
		}

		return (
			<div className="movie-card-item" key={movie._id}>
				<picture>
					<source
						media="(min-width: 0px)"
						srcSet={`https://image.tmdb.org/t/p/w342${movie.poster}`}
					/>
					<source
						media="(min-width: 500px)"
						srcSet={`https://image.tmdb.org/t/p/w500${movie.poster}`}
					/>
					<source
						media="(min-width: 768px)"
						srcSet={`https://image.tmdb.org/t/p/w780${movie.poster}`}
					/>
					<source
						media="(min-width: 1200px)"
						srcSet={`https://image.tmdb.org/t/p/original${movie.poster}`}
					/>
					<img
						src={`https://image.tmdb.org/t/p/w780${movie.poster}`}
						alt={`Poster of ${movie.title}`}
						className="poster"
					/>
				</picture>
				<div className="movie-card-info">
					<h1>{movie.title}</h1>
					<h4>{`Date watched:`}</h4>
					<h5>{`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}</h5>
					<p>{movie.overview}</p>

					<WatchedButton
						isWatched={checkboxes[movie._id]}
						onChange={onChange}
						movieId={movie._id}
					/>
				</div>
			</div>
		);
	});

	return <section className="movie-card">{allMovies}</section>;
}

const mapStateToProps = state => ({
	checkboxes: state.checkboxes,
	moviesAlreadySeen: state.moviesAlreadySeen
});

export default connect(
	mapStateToProps,
	{ checkboxesActions, getCurrentProfile }
)(MovieCard);
