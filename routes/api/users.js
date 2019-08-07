const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Import user model:
const User = require("../../models/User");

//  @route  Get api/users
//  @desc   Test Route
//  @access Public (no token needed)

router.post(
	"/",
	[
		// Name must not be empty:
		check("name", "Name is required")
			.not()
			.isEmpty(),
		// Email must be valid:
		check("email", "Please enter a valid email").isEmail(),
		// Password Length must be more the 6 characters:
		check(
			"password",
			"Password length must be longer than 6 characters!"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

			/* Checklist:
				Check to see if user exists
				If not pull avatar
				Create a new instance of user
				Encrypt the password before saving to DB
				Save User to database
			*/

		const { name, email, password, password2 } = req.body;

		try {
			// See if user exists already:
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ errors: [{ msg: "User already exists" }] });
			}

			// Get User's gravatar:
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});


			// If password confirms create an instance of a User, preparing to save:
			if(password !== password2) {
				return res.status(400).json({ msg: 'Passwords must match!' })
			}

			user = new User({
				name,
				email,
				avatar,
				password
			});

			// Encrypt the password:
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);


			// Save user to database:

			await user.save();

			// Create payload for JSON Web Token:
			const payload = {
				user: { 
					id: user.id
				}
			}


			// Create secret and sign it:
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if(err) throw err;
					res.json({ token })
				}
			);			


		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
