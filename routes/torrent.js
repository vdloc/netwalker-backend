const express = require("express");
const { piratebay } = require("piratebay-scraper");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
	const { query, limit } = req.query;
	const torrents = await piratebay.search(query);
	let results = torrents.slice(0, limit ? Number(limit) : torrents.length);

	results = results.reduce((link, torrent) => link + torrent.link + "\n", "");

	res.send(results);
});

module.exports = router;
