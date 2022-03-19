const { formatInTimeZone } = require('date-fns-tz');
const fs = require('fs-extra');
const path = require('path');

const LOG_PATH = '/var/log/nomad/';

function createLogTime() {
  const time = new Date();
  const logDay = formatInTimeZone(time, 'Asia/Bangkok', 'dd_LL_yyyy');
  const logTime = formatInTimeZone(time, 'Asia/Bangkok', 'dd-LL-yyyy-hh:mm:ss');

  return [logDay, logTime];
}

function logger(data, domain) {
  const [logDay, logTime] = createLogTime();
  const logFileName = path.join(LOG_PATH, `${logDay}.txt`);
  const logContent = `[${logTime}] [${domain}] ${data}\n`;
  console.log(logContent);

  if (fs.pathExists(logFileName)) {
    fs.appendFile(logFileName, logContent);
  } else {
    fs.outputFile(logFileName, logContent);
  }
}

function createDomainLogger(domain) {
  return (data) => logger(data, domain);
}

function customLogger(data, logName) {
  const [_, logTime] = createLogTime();
  const logFileName = path.join(LOG_PATH, logName);

  if (fs.pathExists(logFileName)) {
    fs.appendFile(logFileName, data);
  } else {
    fs.outputFile(logFileName, data);
  }
}

exports.customLogger = customLogger;

module.exports = createDomainLogger;
