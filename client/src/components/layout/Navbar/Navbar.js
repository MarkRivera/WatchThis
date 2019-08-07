import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import "./navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<Fragment>
			<h1 className="nav-item">
				<Link to="/dashboard" className="nav-link">
					{" "}
					<i className="fas fa-film film-icon"></i>{" "}
				</Link>
			</h1>

			<ul className="nav-item">
				<li className="">
					<Link to="/profile" className="profile-btn">
						Profile
					</Link>
				</li>
				<li className="logout-btn">
					<Link to="/" className="nav-link" onClick={logout}>
						<i className="fas fa-sign-out-alt"></i> Logout
					</Link>
				</li>
			</ul>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<h1 className="nav-item">
				<Link to="/" className="nav-link">
					{" "}
					<i className="fas fa-film film-icon"></i>{" "}
				</Link>
			</h1>

			<ul className="nav-item">
				<li className="login-btn">
					<Link to="/login" className="nav-link">
						{" "}
						<i className="fas fa-sign-in-alt login-icon"></i> Login
					</Link>
				</li>
			</ul>
		</Fragment>
	);

	return (
		<nav className="navbar">
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logout }
)(Navbar);
