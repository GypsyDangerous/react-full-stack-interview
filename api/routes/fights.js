const express = require("express");
const router = express.Router();
const Fight = require("../models/fight.model");

router.get("/getAll", async (req, res, next) => {
	const allFights = Fight.find();
	res.json({ data: allFights, count: allFights.length });
});

router.get("/getOne", async (req, res, next) => {
	const { id } = req.query;
	const fight = await Fight.findById(id);

	res.json({ data: fight });
});

router.post("/save", async (req, res, next) => {
	const { body } = req;

	try {
		const newFight = new Fight(body);

		await newFight.save()

		res.json({ success: true, data: newFight });
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Invalid fight configuration",
		});
	}
});

module.exports = router;
