const express = require("express");
const router = express.Router();
// import Robot from "../models/robot.model";
const Robot = require("../models/robot.model");

router.get("/getOne", async (req, res, next) => {
	const { id } = req.query;
	const robot = await Robot.findById(id);
	if (!robot) return res.json({ data: null });

	res.json({ data: robot });
});

router.get("/getAll", (req, res, next) => {
	const robots = Robot.find({});
	res.json({ count: robots.length, data: robots });
});

router.post("/create", async (req, res, next) => {
	const { body } = req;

	try {
		const newRobot = new Robot(body);

		await newRobot.save();

		res.json({
			success: true,
			data: newRobot,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Invalid robot configuration",
		});
	}
});


router.delete("/deleteOne", async (req, res, next) => {
	const {id} = req.query

	await Robot.findByIdAndDelete(id)

	res.json({
		success: true
	})
})

router.patch("/updateOne", async (req, res, next) => {
	const {id, ...updateBody} = req.body

	await Robot.updateOne({_id: id}, updateBody)

	const updatedRobot = await Robot.findById(id)

	res.json({data: updatedRobot})
})


module.exports = router;
