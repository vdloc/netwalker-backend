const { getPosts } = require("../api/ghost");
const { submitPost } = require("../api/reddit");

module.exports = async function () {
	const posts = await getPosts({ limit: "all" });
	const publishedPosts = posts.filter((post) => post.status === "published");

	for (let post of publishedPosts) {
		await submitPost(post);
	}
};
