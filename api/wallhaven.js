const Downloader = require("nodejs-file-downloader");
const path = require("path");
const axios = require("axios").default;
const fs = require("fs-extra");

const apiKey = "dhe62G1FZU52TX35wVQ5ichLtxyWkarP";
const apiUrl = `https://wallhaven.cc/api/v1/search?apikey=${apiKey}`;
const DEST_PATH = path.resolve("wallhaven");

async function wallHavenDownload(query, currentpage = 1) {
	let meta;

	if (currentpage === 1) {
		fs.emptyDir(DEST_PATH);
	}

	const encodedQuery = encodeURIComponent(query);
	const queryURL = `${apiUrl}&q=${encodedQuery}&categories=111&purity=110&page=${currentpage}`;
	const images = await axios.get(queryURL, {
		timeout: 2000,
	});

	for (let index in images.data.data) {
		const item = images.data.data[index];
		const url = item.path;
		console.log("Downloading url", url);
		const downloader = new Downloader({
			url,
			directory: DEST_PATH,
		});

		await new Promise((res) => {
			setTimeout(res, 100);
		});
		await downloader.download();
	}

	meta = meta || images.data.meta;

	if (meta.last_page > currentpage) {
		console.log("Downloading page: " + currentpage);
		await new Promise((res) => {
			setTimeout(res, 2000);
		});

		return await wallHavenDownload(query, currentpage + 1);
	}

	return "OK";
}

module.exports = wallHavenDownload;
