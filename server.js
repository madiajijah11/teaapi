const express = require("express"); // import express
const routes = require("./routes/tea"); // import the routes
const mongoose = require("mongoose"); // import mongoose
const helmet = require("helmet"); // import helmet
const compression = require("compression"); // import compression
require("dotenv").config(); // import dotenv

const app = express(); // create an express app

app.use(express.json()); // use express json
app.use(helmet()); // use helmet
app.use(compression()); // use compression

app.use("/", routes); //to use the routes
app.use("/uploads", express.static("./uploads")); // to use the uploads folder

// add this below app.use("/", routes) to make index.html a static file
app.route("/").get((req, res) => {
	res.sendFile(`${process.cwd()}/index.html`);
});

// establish connection to database
mongoose.connect(
	process.env.MONGODB_URI,
	// error handling
	(err) => {
		if (err) return console.log(`Error : ${err}`);
	},
	console.log(`MongoDB Connection -- Ready state is: ${mongoose.connection.readyState}`)
);

// listen on port 3000
const listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});
