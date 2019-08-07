const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},

	genres: {
		type: [Map],
		required: true,
		default: []
	},

	movies: [
		{
			_id: {
				type: String
			},

			poster: {
				type: String
			},

			title: {
				type: String,
				required: true
			},

			release_date: {
				type: String
			},

			overview: {
				type: String
			},

			genres: {
				type: String
			},

			image_path: {
				type: String
			},

			completed: {
				type: Boolean,
				default: false
			},

			date_watched: {
				type: Date
			}
		}
	]
});

module.exports = Profile = model("profile", ProfileSchema);
