const Tea = require("./../models/tea"); // import the tea model
const multer = require("multer"); // import multer

// create an upload object to upload image
const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, "./uploads");
	},
	filename: (_req, file, cb) => {
		cb(null, file.originalname);
	},
});

const uploadImage = multer({ storage: storage }).single("image");

// newTea function for post new tea
const newTea = (req, res, _next) => {
	// check if the name is already exist in the database
	Tea.findOne({ name: req.body.name }, (err, data) => {
		// if tea not in the database
		if (!data) {
			// create a new tea object using the Tea model and req.body
			const newTea1 = new Tea({
				name: req.body.name,
				image: req.file.path,
				description: req.body.description,
				keywords: req.body.keywords,
				origin: req.body.origin,
				brew_time: req.body.brew_time,
				temperature: req.body.temperature,
			});
			// save this object to database
			newTea1.save((err1, data1) => {
				if (err1) return res.json({ error: err1 });
				return res.json(data1);
			});
			// if there's an error or the tea in db, return a message
		} else {
			if (err) return res.json(`Something went wrong, please try again. ${err}`);
			return res.json({ message: "Tea is already exists." });
		}
	});
};

// getAllTea function to get all tea
const getAllTea = (_req, res, _next) => {
	Tea.find({}, (err, data) => {
		if (err) return res.json({ error: err });
		return res.json(data);
	});
};

// deleteAllTea function to delete all tea
const deleteAllTea = (_req, res, _next) => {
	Tea.deleteMany({}, (err, _data) => {
		if (err) return res.json({ message: "Complete delete failed." });
		return res.json({ message: "Complete delete successful." });
	});
};

// getOneTea function to get one tea
const getOneTea = (req, res, _next) => {
	let name = req.params.name; // get the tea name
	// find the specific tea with that name
	Tea.findOne({ name: name }, (err, data) => {
		if (err || !data) return res.json({ message: "Tea doesn't exist." });
		return res.json(data); // return the tea object if found
	});
};

// post 1 tea comment
const newComment = (req, res, _next) => {
	let name = req.params.name; // get the tea to add the comment in
	let newComment1 = req.body.comment; // get the comment
	// create a comment object to push
	const comment1 = {
		text: newComment1,
		date: new Date(),
	};
	// find the tea object
	Tea.findOne({ name: name }, (err, data) => {
		if (err || !data || !newComment1) {
			return res.json({ message: "Tea doesn't exist." });
		} else {
			// add comment to comments array to tea object
			data.comments.push(comment1);
			// save changes to database
			data.save((err1, data1) => {
				if (err1) return res.json({ message: "Comment failed.", error: err1 });
				return res.json(data1);
			});
		}
	});
};

// deleteOneTea function to delete one tea
const deleteOneTea = (req, res, _next) => {
	let name = req.params.name; // get the name of tea to delete
	// delete the tea with that name
	Tea.deleteOne({ name: name }, (err, data) => {
		// if there's nothing to delete, return a message
		if (data.deletedCount === 0) return res.json({ message: "Tea doesn't exist." });
		// else if there's an error, return error message
		if (err) return res.json(`Something went wrong, please try again. ${err}`);
		// else, return the success message
		return res.json({ message: "Tea deleted." });
	});
};

module.exports = {
	newTea,
	getAllTea,
	deleteAllTea,
	getOneTea,
	newComment,
	deleteOneTea,
	uploadImage,
};
