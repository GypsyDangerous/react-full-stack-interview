const mongoose = require("mongoose");
const { Schema } = mongoose;

const fightSchema = new Schema(
	{
		members: [
			{
				type: [String], // array of robot ids
				required: true,
			},
		],
		winner: {
			type: String, // the id of the robot that won
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Fight = new mongoose.model("fight", fightSchema);

module.exports = Fight