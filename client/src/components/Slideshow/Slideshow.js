import React, { useState, useEffect } from "react";
import "./Slideshow.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { addMoviesToState } from "../../actions/profile";
import { checkboxesActions } from "../../actions/checkboxes";
import Loading from "../Loading/Loading";
import WatchedButton from "../Profile/WatchedButton";

function Slideshow({
	chosenMovies,
	chosenMoviesArrived,
	addMoviesToState,
	checkboxesActions,
	genres
}) {
	let settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	};

	useEffect(() => {
		if (!chosenMoviesArrived) {
			addMoviesToState(genres);
		}
	}, []);

	const onChange = (e, eventInfo) => {
		eventInfo.watched = !e.nativeEvent.target.checked;
		checkboxesActions(eventInfo, false);
	};

	if (chosenMoviesArrived) {
		return (
			<Slider {...settings} className="slideshow">
				{chosenMovies.map(movie => {
					let date = new Date(movie.results.release_date);
					let year = date.getFullYear();
					let eventInfo = {
						watched: false,
						id: movie.results.id,
						data: movie.results
					};

					checkboxesActions(eventInfo, true);

					return (
						<div key={movie.results.id} className="movie-slide">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.results.poster_path}`}
								alt={`Poster for ${movie.results.title}`}
								className="movie-poster"
							/>
							<aside className="movie-info">
								<h3 className="movie-title">{movie.results.title}</h3>

								<h4 className="movie-year">{year}</h4>
								<p className="movie-desc">{movie.results.overview}</p>
								<WatchedButton
									isWatched={movie.results.watched}
									onChange={onChange}
									movieId={movie.results.id}
									eventInfo={eventInfo}
								/>
							</aside>
						</div>
					);
				})}
			</Slider>
		);
	} else {
		return <Loading />;
	}
}

const mapStateToProps = state => ({
	moviesArrived: state.profile.moviesArrived,
	chosenMovies: state.profile.chosenMovies.data,
	chosenMoviesArrived: state.profile.chosenMoviesArrived,
	genres: state.profile.genres
});

export default connect(
	mapStateToProps,
	{ addMoviesToState, checkboxesActions }
)(Slideshow);
