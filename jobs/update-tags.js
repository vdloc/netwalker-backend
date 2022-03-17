require("dotenv").config();
const { getPosts, updateTag, getTags } = require("../api/ghost");
const createDomainLogger = require("../services/log");

const PRIMARY_TAGS = ["phim", "nhạc", "software"];

async function main() {
	const tags = await getTags({ include: count.posts });

	const posts = await getPosts({
		limit: "all",
		filter: "tag:nhac",
		includes: "tag;count.posts",
	});
	console.log(posts[0].tags[0]);

	// const filteredPosts = posts.filter((post) => {
	// 	return post.primary_tag.slug === "nhac";
	// });
	// const tags = filteredPosts.reduce((tags, post) => {
	// 	let includedTags = [];
	// 	post.tags.forEach((postTag) => {
	// 		const isTagIncluded = tags.find(
	// 			(tag) => tag.slug === postTag.slug && tag.slug !== "nhac"
	// 		);

	// 		if (!isTagIncluded) {
	// 			includedTags.push(postTag);
	// 		}
	// 	});

	// 	return [...tags, ...includedTags];
	// }, []);

	// const promises = tags.map(async (tag) => {
	// 	if (tag.description !== "nhac") {
	// 		tag.description = "nhac";
	// 	}

	// 	return updateTag(tag);
	// });

	// await Promise.all(promises);
	// console.log("file: update-tags.js ~ line 10 ~ posts", tags);
}

main();
