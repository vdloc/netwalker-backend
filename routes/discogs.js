const express = require("express");
const router = express.Router();
const { searchDiscogs, getData } = require("../services/discogs");

/* GET users listing. */
router.get("/id", async function (req, res, next) {
	const data = await searchDiscogs(req.query);

	res.send(data);
});

router.get("/data", async function (req, res, next) {
	const data = await getData(req.query.id);

	res.send(data);
});

module.exports = router;
