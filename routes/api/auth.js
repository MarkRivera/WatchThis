const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//  @route  GET api/auth
//  @desc   Return User data
//  @access Public (no token needed)

router.get("/", auth, async (req, res) => {
	// If a user is verified using a token, return their data from the database. The .select() function allows me to pick and choose what data I want and do not want. I do not want to return the password hash from the database and expose it.

	try {
		const user = await User.findById(req.user.id).select("-password");
		console.log(user);
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

//  @route  POST api/users
//  @desc   Login users that are already in DB
//  @access Public (no token needed)

router.post(
	"/",
	[
		// Email must be valid:
		check("email", "Please enter a valid email").isEmail(),
		// Password Length must be more the 6 characters:
		check("password", "Password is required!").exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		/* Checklist:
		
				Find User by email, if they exist ->
				Compare passwords using bcrypt .compare('plain pass', 'hashed pass');
				
		
			*/

		const { email, password } = req.body;

		try {
			// See if user exists already:
			let user = await User.findOne({ email });

			//
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			// Create payload for JSON Web Token:
			const payload = {
				user: {
					id: user.id
				}
			};

			// Create secret and sign it:
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
