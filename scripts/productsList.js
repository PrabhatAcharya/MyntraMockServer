import getData from '../utils/getData.js';
import { navbar } from '../components/navbar.js';
import URL from '../utils/url.js';
import { footer } from '../components/footer.js';
document.getElementById('navbar').innerHTML = navbar();

document.getElementById('footerDiv').innerHTML = footer();
import renderProducts from '../utils/renderSingleProduct.js';

// const URL = 'http://localhost:3000/products';

const productsSection = document.getElementsByName('gender');
let productsFor = localStorage.getItem('productsFor')
	? JSON.parse(localStorage.getItem('productsFor'))
	: 'men';

document.getElementById('clearAll').addEventListener('click', (e) => {
	location.reload();
});

if (!productsFor) {
	productsSection.forEach((el) => {
		el.addEventListener('change', (e) => {
			productsFor = e.target.id;
			localStorage.setItem('productsFor', JSON.stringify(productsFor));
			location.reload();
		});
		if (el.checked) {
			productsFor = el.id;
		}
	});
} else {
	productsSection.forEach((el) => {
		el.addEventListener('change', (e) => {
			productsFor = e.target.id;
			localStorage.setItem('productsFor', JSON.stringify(productsFor));
			location.reload();
		});
		if (el.id === productsFor) {
			el.checked = true;
		}
	});
}

const filterProducts = async (URL) => {
	const products = await getData(URL + '&gender=' + productsFor);
	// const filtered = products.filter((el) => {
	// 	return el.gender === productsFor;
	// });
	console.log(products);
	return products;
};

const container = document.getElementById('container');

const renderAllProducts = async (data) => {
	container.innerHTML = '';
	data.forEach((el) => {
		renderProducts(el, container);
	});

	const path = document.getElementById('path');
	path.innerHTML = `Home / ${
		productsFor[0].toUpperCase() + productsFor.slice(1)
	} / ${data[0]?.categories.toUpperCase() || 'PRODUCT'} `;

	document.getElementById('currentProduct').innerHTML =
		data[0]?.categories.toUpperCase() || 'Product';

	document.getElementById('selectedCount').innerHTML = data?.length || 0;
};

const page = document.getElementById('page');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

renderAllProducts(
	await filterProducts(URL + `?_page=${+page.innerHTML}&_limit=8`)
);

if (+page.innerHTML === 1) {
	prev.disabled = true;
}

next.addEventListener('click', async (e) => {
	if (+page.innerHTML < 5) {
		e.target.disabled = false;
		prev.disabled = false;
		page.innerHTML = +page.innerHTML + 1;
		renderAllProducts(
			await filterProducts(URL + `?_page=${+page.innerHTML}&_limit=8`)
		);
	} else {
		console.log(e.target);
		// e.target.style.opacity = '0.2';
	}
});
prev.addEventListener('click', async (e) => {
	if (+page.innerHTML > 1) {
		e.target.disabled = false;
		next.disabled = false;
		page.innerHTML = +page.innerHTML - 1;
		renderAllProducts(
			await filterProducts(URL + `?_page=${+page.innerHTML}&_limit=8`)
		);
	} else {
		console.log(e.target);
		e.target.disabled = true;
		// e.target.style.opacity = '0.2';
	}
});

///////////////////////////////
///Price range application
///////////////////////////////

const priceCap = document.getElementsByName('price');

priceCap.forEach((el) => {
	el.addEventListener('change', (e) => {
		applyPriceCap();
		let toReload = true;
		priceCap.forEach((elem) => {
			if (elem.checked) toReload = false;
		});
		if (toReload) location.reload();
	});
});

let priceCapApplied = new Array();

async function applyPriceCap() {
	priceCap.forEach((el) => {
		if (el.checked) {
			priceCapApplied.push(el);
			priceCapApplied = [...new Set(priceCapApplied)];
		} else if (priceCapApplied.includes(el))
			priceCapApplied.splice(priceCapApplied.indexOf(el), 1);
	});

	var priceAppliedProducts = [];
	const filtered = await filterProducts(
		URL + `?_page=${+page.innerHTML}&_limit=8`
	);
	// const productsWithDiscounts = await applyDiscounts();

	// if (productsWithDiscounts.length > 0) filtered = productsWithDiscounts;

	if (priceCapApplied.length > 0) {
		console.log('true');
		for (let i = 0; i < priceCapApplied.length; i++) {
			let el = priceCapApplied[i];

			if (el.id === '100-1000') {
				let ans = filtered.filter((el) => {
					let priceAfterDiscount;
					if (el.discount) {
						priceAfterDiscount = +el.price - (+el.price * el.discount) / 100;
					} else {
						priceAfterDiscount = el.price;
					}

					return +priceAfterDiscount >= 100 && +priceAfterDiscount <= 1000;
				});

				priceAppliedProducts = priceAppliedProducts.concat(ans);
			} else if (el.id === '1001-2000') {
				let ans = filtered.map((el) => {
					return el;
				});

				ans = ans.filter((el) => {
					let priceAfterDiscount;
					if (el.discount) {
						priceAfterDiscount = +el.price - (+el.price * el.discount) / 100;
					} else {
						priceAfterDiscount = el.price;
					}
					return +priceAfterDiscount >= 1001 && +priceAfterDiscount <= 2000;
				});

				priceAppliedProducts = priceAppliedProducts.concat(ans);
			} else if (el.id === '2001-3000') {
				let ans = filtered.map((el) => {
					return el;
				});

				ans = ans.filter((el) => {
					let priceAfterDiscount;
					if (el.discount) {
						priceAfterDiscount = +el.price - (+el.price * el.discount) / 100;
					} else {
						priceAfterDiscount = el.price;
					}
					return +priceAfterDiscount >= 2001 && +priceAfterDiscount <= 3000;
				});

				priceAppliedProducts = priceAppliedProducts.concat(ans);
			} else if (el.id === '3001-4000') {
				let ans = filtered.map((el) => {
					return el;
				});

				ans = ans.filter((el) => {
					let priceAfterDiscount;
					if (el.discount) {
						priceAfterDiscount = +el.price - (+el.price * el.discount) / 100;
					} else {
						priceAfterDiscount = el.price;
					}
					return +priceAfterDiscount >= 3001 && +priceAfterDiscount <= 4000;
				});

				priceAppliedProducts = priceAppliedProducts.concat(ans);
			} else {
				let ans = filtered.map((el) => {
					return el;
				});

				ans = ans.filter((el) => {
					let priceAfterDiscount;
					if (el.discount) {
						priceAfterDiscount = +el.price - (+el.price * el.discount) / 100;
					} else {
						priceAfterDiscount = el.price;
					}
					return +priceAfterDiscount >= 4001;
				});

				priceAppliedProducts = priceAppliedProducts.concat(ans);
			}
			if (priceAppliedProducts.length > 0) {
				container.innerHTML = '';
				priceAppliedProducts.forEach((el) => {
					renderProducts(el, container);
				});
			} else {
				container.innerHTML = '';
				filtered.forEach((el) => {
					renderProducts(el, container);
				});
			}
		}
	}
	console.log(priceAppliedProducts);
	return priceAppliedProducts;
}

// ////////////////////////////////
// ///sorting of products
// ////////////////////////////////

const selectEl = document.getElementById('sorting');

selectEl.addEventListener('change', async (e) => {
	let dataToBeSorted;
	const filtered = await filterProducts(
		URL + `?_page=${+page.innerHTML}&_limit=8`
	);
	const priceApplied = await applyPriceCap();
	// const discountsPrice = await applyDiscounts();

	if (priceApplied.length > 0) {
		dataToBeSorted = priceApplied;
	} else {
		dataToBeSorted = filtered;
	}

	if (e.target.value === 'discount') {
		dataToBeSorted.sort((a, b) => {
			return +b.discount - +a.discount;
		});

		container.innerHTML = '';

		dataToBeSorted.forEach((el) => {
			renderProducts(el, container);
		});
	} else if (e.target.value === 'htl') {
		dataToBeSorted.sort((a, b) => {
			let priceAfterDiscountA;
			if (a.discount) {
				priceAfterDiscountA = +a.price - (+a.price * a.discount) / 100;
			} else {
				priceAfterDiscountA = a.price;
			}

			let priceAfterDiscountB;
			if (b.discount) {
				priceAfterDiscountB = +b.price - (+b.price * b.discount) / 100;
			} else {
				priceAfterDiscountB = b.price;
			}

			return +priceAfterDiscountB - +priceAfterDiscountA;
		});

		container.innerHTML = '';

		dataToBeSorted.forEach((el) => {
			renderProducts(el, container);
		});
	} else if (e.target.value === 'lth') {
		dataToBeSorted.sort((a, b) => {
			let priceAfterDiscountA;
			if (a.discount) {
				priceAfterDiscountA = +a.price - (+a.price * a.discount) / 100;
			} else {
				priceAfterDiscountA = a.price;
			}

			let priceAfterDiscountB;
			if (b.discount) {
				priceAfterDiscountB = +b.price - (+b.price * b.discount) / 100;
			} else {
				priceAfterDiscountB = b.price;
			}

			return +priceAfterDiscountA - +priceAfterDiscountB;
		});

		container.innerHTML = '';

		dataToBeSorted.forEach((el) => {
			renderProducts(el, container);
		});
	}
});

// // ////////////////////////////////////////
// // ///filter on the basis of the discounts
// // ////////////////////////////////////////

const discounts = document.getElementsByName('discount');
discounts.forEach((e) => {
	e.addEventListener('change', (e) => {
		applyDiscounts();
	});
});

// //////////////////////////////////////
// ///Apply discounts function
// //////////////////////////////////////

async function applyDiscounts() {
	let dataToBeSorted;

	let filtered = await filterProducts(
		URL + `?_page=${+page.innerHTML}&_limit=8`
	);
	let priceApplied = await applyPriceCap();

	if (priceApplied.length > 0) {
		dataToBeSorted = priceApplied;
	} else {
		dataToBeSorted = filtered;
	}

	let checked;

	discounts.forEach((e) => {
		if (e.checked) checked = e;
	});

	let productsAfterDiscounts = [];

	console.log(checked);
	if (checked.id === '10%above') {
		productsAfterDiscounts = dataToBeSorted.filter((e) => {
			return +e.discount >= 10;
		});
	} else if (checked.id === '20%above') {
		productsAfterDiscounts = dataToBeSorted.filter((e) => {
			return +e.discount >= 20;
		});
	} else {
		productsAfterDiscounts = dataToBeSorted.filter((e) => {
			return +e.discount >= 30;
		});
	}

	container.innerHTML = '';
	productsAfterDiscounts.forEach((e) => {
		renderProducts(e, container);
	});

	return productsAfterDiscounts;

	// console.log(productsAfterDiscounts);
}
