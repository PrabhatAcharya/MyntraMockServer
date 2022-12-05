import url from './url.js';

const getData = async (URL = url) => {
	console.log(URL);
	const res = await fetch(URL);
	const data = await res.json();
	return data;
};

export default getData;
