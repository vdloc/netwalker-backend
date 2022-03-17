const { Client } = require("node-scp");

const server = {
	host: "45.32.117.14", //remote host ip
	port: 22, //port used for scp
	username: "nomad", //username to authenticate
	password: "VuDucL0c29808",
};
const buildPath = "build";
const remotePath = "/home/nomad/tool/";

async function upload() {
	try {
		const client = await Client(server);
		await client.uploadDir(buildPath, remotePath);
		client.close(); // remember to close connection after you finish
	} catch (e) {
		console.log(e);
	}
}

upload();
