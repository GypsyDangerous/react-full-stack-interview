const mongoose = require("mongoose");
const { Schema } = mongoose;

const numberAttribute = {
	type: Number,
	min: 1,
	max: 10,
	required: true
};

const robotSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: 3,
		},
		color: {
			type: String,
			required: true,
			minLength: 4, // eg: #f4a
			maxLength: 7, // eg: #ff44aa
		},
		attack: numberAttribute,
		defense: numberAttribute,
		healing: numberAttribute,
	},
	{
		timestamps: true,
	}
);

const Robot = mongoose.model("robot", robotSchema);

module.exports = Robot;
