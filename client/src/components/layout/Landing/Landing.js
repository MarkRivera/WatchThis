import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const Landing = () => {
	return (
		<Fragment>
			<div className="floating-bg">
				<div className="bg-cover"></div>
				<div className="bg-image" alt="Movie theater, ticket and popcorn"></div>
			</div>

			<div className="hero">
				<h1 className="hero-title">
					Don't know what to watch?
				</h1>
				<div className="cta">
					<Link to="/register" className="register-btn">
						<i className="fas fa-globe login-icon"></i>
						Register
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default Landing;
