const express = require("express");
const fs = require("fs/promises");
const { getPosts } = require("../services/ghostApi");
const reddit = require("../services/reddit");
const router = express.Router();
const axios = require("axios").default;

/* GET users listing. */
router.get("/", async function (req, res, next) {
	// const submittedPosts = JSON.parse(require("database/reddit.json"));
	const data = await getPosts({ limit: "all" });
	const posts = data.map(({ id, title, url, excerpt, feature_image }) => ({
		title,
		url,
		excerpt,
		feature_image,
		id,
		twitter: `${title} ${url}`,
	}));

	try {
		// Submit a link to the /r/BitMidi subreddit
		const promises = posts.map(async ({ title, url }) => {
			return await reddit.post("/api/submit", {
				sr: "netwalkervn",
				kind: "link",
				resubmit: false,
				title,
				url,
			});
		});

		const comments = await Promise.all(promises);
		fs.writeFile("database/reddit.json", JSON.stringify(comments));
		res.send("OK");
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
