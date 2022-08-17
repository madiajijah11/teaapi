const moongose = require("mongoose"); // import mongoose
const { Schema } = moongose; // import schema from mongoose

// create tea schema
const teaSchema = new Schema({
	name: { type: String, required: true },
	image: String,
	description: String,
	keywords: [],
	origin: String,
	brew_time: Number,
	temperature: Number,
	comments: [{ text: String, date: { type: String, default: new Date() } }],
});

const Tea = moongose.model("Tea", teaSchema); // convert to model named Tea

module.exports = Tea; // export the model to use in other files
