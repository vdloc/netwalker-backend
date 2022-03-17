const express = require("express");
const { getPosts } = require("../services/ghostApi");
const fs = require("fs/promises");
const reddit = require("../services/reddit");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
	const data = await getPosts({ limit: "all" });
	const posts = data.reduce(
		(str, { title, url }) => str.concat(`${title} ${url}\n`),
		""
	);
	fs.writeFile("/home/nomad/netwalker-backend/database/posts.text", posts);

	res.send(posts);
});

module.exports = router;
