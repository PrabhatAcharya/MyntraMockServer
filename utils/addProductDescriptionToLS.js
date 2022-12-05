import getData from './getData.js';
import URL from './url.js';

export default async function addProductDescriptionToLS(id) {
	console.log(id);
	const details = await getData(URL + `/${id}`);
	console.log(URL + `/${id}`);

	localStorage.setItem('indProduct', JSON.stringify(details));
}
