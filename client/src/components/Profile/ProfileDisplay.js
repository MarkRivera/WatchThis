import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserDisplay from "./UserDisplay";
import MovieDisplay from "./MovieDisplay";
import PropTypes from "prop-types";

function ProfileDisplay({
	profile: { info, genres, moviesAlreadySeen },
	auth
}) {
	if (!auth.isAuthenticated) {
		return <Redirect to="/login" />;
	}

	return !info ? (
		<Redirect to="/genres" />
	) : (
		<Fragment>
			<UserDisplay user={info} genres={genres} />
			<MovieDisplay movies={moviesAlreadySeen} />
		</Fragment>
	);
}

ProfileDisplay.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps)(ProfileDisplay);
