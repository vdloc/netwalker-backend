const { formatDuration, intervalToDuration, format } = require("date-fns");
const vi = require("date-fns/locale/vi");

function getReadableMilis(start, end) {
	const duration = intervalToDuration({ start, end });
	return formatDuration(duration, { locale: vi });
}

function getCurrentTime() {
	return format(new Date(), "dd-MM-yyyy", { locale: vi });
}

module.exports = { getReadableMilis, getCurrentTime };
