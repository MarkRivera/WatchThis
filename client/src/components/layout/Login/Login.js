import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";
import "./login.css";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const { email, password } = formData;

	const onChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const onFocus = e => {
		const inputSiblingStyle = e.nativeEvent.target.nextSibling.style;
		inputSiblingStyle.top = "40%";
		inputSiblingStyle.transform = "translateY(-100%)";
		inputSiblingStyle.fontSize = "11px";
	};

	const onBlur = e => {
		const inputSiblingStyle = e.nativeEvent.target.nextSibling.style;

		if (formData[e.target.name].length <= 0) {
			inputSiblingStyle.top = "50%";
			inputSiblingStyle.transform = "translateY(-50%)";
			inputSiblingStyle.fontSize = "14px";
		}
	};

	const onSubmit = async e => {
		e.preventDefault();
		login(email, password);
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section className="form-box">
			<h1 className="form-title"> Welcome </h1>
			<form className="auth-form" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						aria-describedby="email"
						name="email"
						value={email}
						onChange={e => onChange(e)}
						onFocus={e => onFocus(e)}
						onBlur={e => onBlur(e)}
					/>
					<label for="email" className="input-label">
						Email
					</label>
				</div>

				<div className="form-group ">
					<input
						type="password"
						className="form-control"
						name="password"
						value={password}
						onChange={e => onChange(e)}
						onFocus={e => onFocus(e)}
						onBlur={e => onBlur(e)}
					/>

					<label for="password" className="input-label">
						Password
					</label>
				</div>

				<button type="submit" className="form-btn">
					Submit
				</button>
				<small className="form-text">
					Don't have an account?{" "}
					<span className="text-primary">
						<Link to="/register">Register here!</Link>
					</span>
				</small>
			</form>
		</section>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ login }
)(Login);
