import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Slideshow from "../Slideshow/Slideshow";
import GenresScreen from "../GenreScreen/GenresScreen";
import Loading from "../Loading/Loading";
import { connect } from "react-redux";
import { getCurrentProfile, addMoviesToState } from "../../actions/profile";

function Dashboard({
	getCurrentProfile,
	auth,
	profile: {
		info,
		genres,
		genresGreaterThanZero,
		moviesArrived,
		profileLoading
	}
}) {
	if (auth.token !== null) {
		if (profileLoading) {
			return <Loading />;
		} else {
			if (!genresGreaterThanZero) {
				return <Redirect to="/genres" />;
			} else {
				return <Redirect to="/movies" />;
			}
		}
	} else {
		return <Redirect to="/login" />;
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile,
	chosenMovies: state.profile.chosenMovies
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, addMoviesToState }
)(Dashboard);
