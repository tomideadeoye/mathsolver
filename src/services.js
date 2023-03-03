import axios from "axios";
// import fs from "fs";

// const baseurl = "https://king-prawn-app-c9gz3.ondigitalocean.app/";

const baseurl = "http://localhost:8000/";

// eslint-disable-next-line no-unused-vars
export async function axiosCall(path, data, method) {
	let formdata = new FormData();
	formdata.append("name", data.name);
	formdata.append("emailTo", data.emailTo);
	formdata.append("website", data.website);
	formdata.append("pitch_uploaded", data.pitch_uploaded);

	let bodyContent = formdata;

	const response = await axios({
		header: {
			"Content-Type": "multipart/form-data",
		},
		method: method,
		url: baseurl + path,
		data: bodyContent,
	});

	return response;
}
