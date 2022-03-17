const { Tmdb } = require("tmdb");
const Downloader = require("nodejs-file-downloader");
const path = require("path");
const fs = require("fs-extra");

const apiKey = "88c5a8ad5e5356dc541bd7aa5743955f";
const moviedb = new Tmdb(apiKey);

const BACKDROPS_PATH = path.resolve("tmdb/backdrops");
const POSTERS_PATH = path.resolve("tmdb/posters");
const INFO_PATH = path.resolve("tmdb/tmdb.json");
const DEST_PATH = "/mnt/c/Users/Me/Pictures/tmdb";

async function clearOldData() {
	await fs.emptyDir(BACKDROPS_PATH);
	await fs.emptyDir(POSTERS_PATH);
	if (fs.pathExists(INFO_PATH)) {
		await fs.rm(INFO_PATH);
	}
	await fs.emptyDir(DEST_PATH);
}

async function searchMovie(query) {
	return await moviedb.get("search/multi", { query });
}

async function getTVData(id, seasonOrder) {
	await clearOldData();

	const info = await moviedb.get(`tv/${id}`);
	const images = await moviedb.get(`tv/${id}/images`);

	const backdrops = images.backdrops.map(async (path) => {
		const url = `https://www.themoviedb.org/t/p/original${path.filePath}`;
		const downloader = new Downloader({
			url,
			directory: BACKDROPS_PATH,
		});

		return await downloader.download();
	});
	const posters = images.posters.map(async (path) => {
		const url = `https://www.themoviedb.org/t/p/original${path.filePath}`;
		const downloader = new Downloader({
			url,
			directory: POSTERS_PATH,
		});

		return await downloader.download();
	});
	const seasonNumber = info.seasons[seasonOrder].seasonNumber;
	const season = await moviedb.get(`tv/${id}/season/${seasonNumber}`);
	const infoData = {
		id,
		title: info.name,
		episodes: season.episodes.map((episode) => episode.name),
	};

	await Promise.all([...backdrops, ...posters]);
	await fs.appendFile(INFO_PATH, JSON.stringify(infoData, null, 2));
	await fs.copy("tmdb", DEST_PATH);

	return { images, info: infoData };
}

async function getMovieData(id) {
	// await clearOldData();

	const info = await moviedb.get(`movie/${id}`);
	const images = await moviedb.get(`movie/${id}/images`);

	const backdrops = images.backdrops.map(async (path) => {
		const url = `https://www.themoviedb.org/t/p/original${path.filePath}`;
		const downloader = new Downloader({
			url,
			directory: BACKDROPS_PATH,
		});

		return await downloader.download();
	});
	const posters = images.posters.map(async (path) => {
		const url = `https://www.themoviedb.org/t/p/original${path.filePath}`;
		const downloader = new Downloader({
			url,
			directory: POSTERS_PATH,
		});

		return await downloader.download();
	});

	const infoData = {
		id,
		title: info.name,
	};

	await Promise.all([...backdrops, ...posters]);
	await fs.appendFile(INFO_PATH, JSON.stringify(infoData, null, 2));
	await fs.copy("tmdb", DEST_PATH);

	return { images, info: infoData };
}

module.exports = {
	searchMovie,
	getTVData,
	getMovieData,
};
