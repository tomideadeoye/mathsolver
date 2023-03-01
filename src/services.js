import axios from "axios";

const api = "https://king-prawn-app-c9gz3.ondigitalocean.app/";

export async function axiosCall(url, data, method) {
	if (data.image_url !== "") {
		data.image = "";
		data.image_id = "";
	}

	let formdata = new FormData();
	for (const key in data) {
		formdata.append(key, data[key]);
	}

	let reqOptions = {
		url: api + url,
		method: method ? method : "POST",
		headers: {},
		data: formdata,
	};
	return await axios.request(reqOptions);
}
