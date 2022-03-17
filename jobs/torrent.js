const { piratebay } = require("piratebay-scraper");

async function torrent(params) {
	const torrents = await piratebay.search("FLAC");
	console.log(torrents);
}

torrent();
