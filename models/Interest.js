const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const InterestSchema = new Schema({
	name: {
		type: String,
		required: true
	},

	genre: {
		type: String
	},

	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Interest = model("interest", InterestSchema);
