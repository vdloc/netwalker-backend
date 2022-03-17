const createDomainLogger = require("../services/log");
const Discogs = require("disconnect").Client;

const discogs = new Discogs({
	consumerKey: process.env.DISCOGS_CONSUMER_KEY,
	consumerSecret: process.env.DISCOGS_CONSUMER_SECRET,
});
const db = discogs.database();
const LOG_DOMAIN = "discogs-api";
const discogsLogger = createDomainLogger(LOG_DOMAIN);

function formatTracklist(tracklist) {
	return tracklist.map(
		({ title, duration }) => `${title}${duration ? ` - ${duration}` : ""}`
	);
}

function getImagesURL(images) {
	return images.map(({ uri, resource_url }) => uri || resource_url);
}

async function searchDiscogs(query) {
	try {
		const result = await db.search(query);

		discogsLogger(`Query success with query : ${query}`);
		
		return result;
	} catch (error) {
		discogsLogger(`Query failed with query : ${query} due to error : ${error}`);
	}
}

async function getData(id) {
	try {
		const { tracklist, genres, styles, images, year } = await db.getRelease(id);

		discogsLogger(`Get release data success with ID : ${id}`);

		return {
			tracklist: formatTracklist(tracklist),
			genres: [...genres, ...styles],
			images: getImagesURL(images),
			year,
		};
	} catch (error) {
		discogsLogger(
			`Get release data failed with ID : ${id} due to error : ${error}`
		);
	}
}

module.exports = {
	searchDiscogs,
	getData,
};
