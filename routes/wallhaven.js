const express = require("express");
const router = express.Router();
const wallhavenDownload = require("../services/wallhaven");

/* GET users listing. */
router.get("/", async function (req, res, next) {
	const { query } = req.query;
	await wallhavenDownload(query);

	res.send("OK");
});

module.exports = router;
