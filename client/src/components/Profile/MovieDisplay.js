import React from "react";
import MovieCard from "./MovieCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function MovieDisplay({ movies, moviesAlreadySeen }) {
	return moviesAlreadySeen ? (
		<MovieCard movies={movies} />
	) : (
		<div> {"You haven't watched a movie yet!"} </div>
	);
}

MovieDisplay.propTypes = {
	movies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	movies: state.profile.moviesAlreadySeen,
	moviesAlreadySeen: state.profile.moviesAlreadySeen
});

export default connect(mapStateToProps)(MovieDisplay);
