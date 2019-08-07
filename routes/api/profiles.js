const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult, sanitizeParam } = require("express-validator");
const config = require("config");

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Custom Validator for arrays:

const customValidators = {
	isArray: async (value) => {
		const isArray = await Array.isArray(value);

		if (!isArray) {
			throw new Error("I'm not an array of genres!");
		}

		return isArray;
	},

	notEmpty: async array => {
		if (array.length <= 0) {
			throw new Error("There should be genres in here!");
		}
		
		return true
	},

	contains: async array => {
		const genres = config.get("genres");

		const isMatched = array.filter( genre => {
			const genreList = genres.map( element => element.name);
			const match = genreList.includes(genre);
			return match
		})

		if(isMatched.length <= 0) {
			throw new Error("Genres must match database!");
		}
		
		return true
	},

	lessThanThree: async array => {
		if (array.length > 3) {
			throw new Error('Genre array should have no more than 3 genres!');
		} 

		return array[0]
	}
}

const { isArray, notEmpty, contains, lessThanThree } = customValidators

//  @route  Get api/profile/me
//  @desc   Get current user's profile
//  @access Private (token needed)

router.get("/me", auth, async (req, res) => {
	try {
		// Find the one profile with .findOne(). Since we've referenced the ID in the model, we can use req.user.id which comes from middleware/auth.js to pass in an ID to search with. Use .populate() to pull in any more fields you would like:

		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "avatar"]
		);

		// Check to see if user exists:
		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}

});

//  @route  POST api/profile/
//  @desc   Create or update current user's profile
//  @access Private (token needed)

router.post(
	"/",
	[
		auth,
		sanitizeParam("genres").customSanitizer((value, { req }) => {
			const genres = config.get("genres");

			if (!req.body.genres) {
				return null
			}

			const isMatched = req.body.genres.filter( genre => {
				const genreList = genres.map( element => element.name);
				const match = genreList.includes(genre);
				return match
			})

			return req.body.genres = isMatched;
		}),
		[
			check("genres", "Should be an array")
				.custom(isArray),
			check("genres", "Should not be empty")
				.custom(notEmpty),
			check("genres", "Less than or equal to 3 genres")
				.custom(lessThanThree)
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { genres } = req.body;

		// Build profile object:
		const profileFields = {};
		profileFields.user = req.user.id;
		
		// Properly format array then attach to profile obj:
		if(genres) {
			// Create array to place in profile field's genres property"
			genresForProfile = []

			// Get all genres to compare the received names to the stored ones:
			const allGenres = config.get("genres");

			const sorted = genres.map(genre => {
				const trim = genre.trim();

				const filtered = allGenres.filter(genre => {
					if(genre.name === trim) {
						genresForProfile.push(genre);
						return genre;
					}
					return false
				});

				return filtered;
			});

			// Place completed array into profile fields genre property:
			profileFields.genres = genresForProfile;
		}

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if(profile) {
				// Update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields }, 
					{ new: true }
				);

				// Return profile
				return res.json(profile);
			}

			// Create:
			profile = new Profile(profileFields);

			await profile.save();

			// Return profile
			res.json(profile);
		} catch(err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//  @route  Delete api/profile/delete
//  @desc   Delete User 
//  @access Private (token needed)

router.delete('/delete', auth, async (req, res) => {
	
	try {
		// Remove Profile
		await User.findOneAndRemove({ user: req.user.id })
		// Remove User
		await User.findOneAndRemove({ _id: req.user.id })

		res.json({ msg: 'User Removed' });

	} catch(err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

module.exports = router;
