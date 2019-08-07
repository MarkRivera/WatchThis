import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	addGenreToProfile,
	createProfile,
	getCurrentProfile,
	addMoviesToState
} from "../../actions/profile.js";
import GenreButton from "./GenreButton";
import GenreDisplay from "./GenreDisplay";
import "./GenresScreen.css";

function GenresScreen({
	genres: { genres, genresLoading },
	savedGenres = [],
	addGenreToProfile,
	createProfile,
	getCurrentProfile,
	addMoviesToState,
	profile,
	auth,
	history
}) {
	const selectedGenreArray = Object.values(savedGenres);
	const [selected, setToSelected] = useState(selectedGenreArray);
	const [toDashboard, setToDashboard] = useState(false);

	const handleClick = e => {
		e.persist();
		let eventInfo = {
			id: parseInt(e.target.id, 10),
			name: e.target.innerText
		};

		if (selected.length >= 3) {
			setToSelected(prevSelected => {
				let newState = [
					...prevSelected.splice(1, prevSelected.length - 1),
					eventInfo
				];
				return newState;
			});
		} else {
			setToSelected([...selected, eventInfo]);
		}
	};

	const handleSend = async e => {
		e.persist();
		if (!profile.info) {
			let names = [];
			selected.map(element => names.push(element.name));
			createProfile(names).then(data => setToDashboard(true));
		}
	};

	if (toDashboard) {
		return <Redirect to="/dashboard" />;
	}

	if (auth.isAuthenticated) {
		return (
			<section className="container">
				<header className="genre-controls row">
					<GenreDisplay selected={selected} />
					<button className="btn btn-light row col-12" onClick={handleSend}>
						{" "}
						Send{" "}
					</button>
				</header>

				<GenreButton genres={genres} onClick={handleClick} />
			</section>
		);
	} else {
		return <Redirect to="/login" />;
	}
}

GenresScreen.propTypes = {
	genres: PropTypes.object.isRequired,
	addGenreToProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	genres: state.genres,
	genresLoading: state.genresLoading,
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ addGenreToProfile, createProfile, getCurrentProfile, addMoviesToState }
)(GenresScreen);
