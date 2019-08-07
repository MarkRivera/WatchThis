import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import "./register.css";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setformData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});

	const { name, email, password, password2 } = formData;

	const onChange = e =>
		setformData({
			...formData,
			[e.target.name]: e.target.value
		});

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

	const onSubmit = e => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			register({ name, email, password, password2 });
		}
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section className="form-box">
			<h1 className="form-title"> Sign Up Here </h1>
			<form className="auth-form" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						name="name"
						className="form-control"
						aria-describedby="Name"
						value={name}
						onChange={e => onChange(e)}
						onFocus={e => onFocus(e)}
						onBlur={e => onBlur(e)}
					/>
					<label for="name" className="input-label">
						Name
					</label>
				</div>

				<div className="form-group">
					<input
						type="email"
						name="email"
						className="form-control"
						aria-describedby="email"
						value={email}
						onChange={e => onChange(e)}
						onFocus={e => onFocus(e)}
						onBlur={e => onBlur(e)}
					/>
					<label for="email" className="input-label">
						Email
					</label>
					{/*<small className="form-text text-muted">
											We'll never share your email with anyone else
										</small>*/}
				</div>

				<div className="form-group">
					<input
						type="password"
						name="password"
						className="form-control"
						value={password}
						onChange={e => onChange(e)}
						onFocus={e => onFocus(e)}
						onBlur={e => onBlur(e)}
					/>
					<label for="password" className="input-label">
						Password
					</label>
					{/*<small className="form-text muted">
											Your password must be at least 6 characters
										</small>*/}
				</div>

				<div className="form-group">
					<input
						type="password"
						name="password2"
						className="form-control"
						value={password2}
						onChange={e => onChange(e)}
						onFocus={e => onFocus(e)}
						onBlur={e => onBlur(e)}
					/>
					<label for="password2" className="input-label">
						Confirm Password
					</label>
				</div>

				<button type="submit" className="form-btn">
					Submit
				</button>
				<small className="form-text">
					Already have an account?{" "}
					<span className="text-primary">
						<Link to="/login">Login here!</Link>
					</span>
				</small>
			</form>
		</section>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ setAlert, register }
)(Register);
