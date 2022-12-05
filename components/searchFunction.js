import getData from '../utils/getData.js';
import URL from '../utils/url.js';
import addProductDescriptionToLS from '../utils/addProductDescriptionToLS.js';

const searchInput = document.getElementById('search');

let id;
searchInput.addEventListener('keypress', (e) => {
	if (id) clearTimeout(id);
	console.log(e.key);
	id = setTimeout(async () => {
		const data = await getData(URL);
		// console.log(data);
		let reg = new RegExp(e.target.value, 'i');
		const filterd = data.filter((elem) => {
			return (
				elem.productTitle.match(reg) ||
				elem.brand.match(reg) ||
				elem.description.match(reg)
			);
		});

		console.log(filterd);
		document.querySelector('#two>ul').innerHTML = '';
		filterd.map((elem) => {
			let l1 = document.createElement('li');
			l1.textContent = elem.productTitle;
			l1.addEventListener('click', async () => {
				await addProductDescriptionToLS(elem.id);
				window.location.href = '/pages/productDetails.html';
			});

			document.querySelector('#two>ul').append(l1);
		});
	}, 2000);
});
