import axios from "axios";

// const api = "https://king-prawn-app-c9gz3.ondigitalocean.app/";
const baseurl = 'https://king-prawn-app-c9gz3.ondigitalocean.app/'

// const baseurl = "http://localhost:8000/";

// eslint-disable-next-line no-unused-vars
export async function axiosCall(path, data, method) {
	let headersList = {
		Accept: "*/*",
		"Content-Type": "application/json",
	};

	let bodyContent = JSON.stringify(data);

	let reqOptions = {
		url: baseurl + path,
		method: method,
		headers: headersList,
		data: bodyContent,
	};

	let response = await axios.request(reqOptions);
	console.log(response);
	return response;
}
