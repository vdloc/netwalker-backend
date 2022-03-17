require("dotenv").config();
const { getPosts, updatePost, readPost } = require("./services/ghostApi");

function getMatchIndex(str, reg) {
	let arr;
	let indexes = [];

	while ((arr = reg.exec(str)) !== null) {
		indexes.push(arr.index);
	}

	return indexes;
}

function replace(post) {
	let { mobiledoc } = post;
	let titles = mobiledoc.match(/<p class=\\*"kg-callout-title\\*">.+?<\/p>/g);

	if (titles) {
		titles.forEach((title, index) => {
			mobiledoc = mobiledoc.replace(title, "");
			const textIndexes = getMatchIndex(
				mobiledoc,
				/<div class=\\"kg-callout-text\\"/g
			);
			const replaceIndex = textIndexes[index];
			mobiledoc =
				mobiledoc.slice(0, replaceIndex) +
				title +
				mobiledoc.slice(replaceIndex);
		});
	}

	return { ...post, mobiledoc };
}

async function test() {
	const posts = await getPosts({ limit: "all" });

	await Promise.all(
		posts.map(async (post) => {
			const updatedPost = replace(post);
			await updatePost(updatedPost);
		})
	);
}

test();
