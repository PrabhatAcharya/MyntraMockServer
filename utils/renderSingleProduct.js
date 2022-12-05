import addProductDescriptionToLS from "./addProductDescriptionToLS.js";
import getData from "./getData.js";
import URL from "./url.js";

import addToWishList from "./addToWishlist.js";

export default function renderProducts(object, container) {
	let card = document.createElement("div");
	card.classList.add("card");
	card.style.cursor = "pointer";

	let img = document.createElement("img");
	img.setAttribute("src", object.images[0]);
	img.setAttribute("alt", object.productTitle);
	img.addEventListener("click", async (e) => {
		await addProductDescriptionToLS(object.id);
		window.location.href = "productDetails.html";
	});

	let bottom = document.createElement("div");

	let p = document.createElement("h3");
	p.innerHTML = object.productTitle;

	let pMuted = document.createElement("p");
	pMuted.innerHTML = object.description;

	let priceAfterDiscount;
	let s = document.createElement("s");
	if (object.discount) {
		priceAfterDiscount =
			+object.price - (+object.price * object.discount) / 100;
		s.innerHTML = "Rs." + object.price;
	}

	let span = document.createElement("span");
	span.innerHTML = priceAfterDiscount
		? " Rs." + priceAfterDiscount
		: " Rs." + object.price;

	let p1 = document.createElement("p");
	p1.append(span, s);

	bottom.append(p, pMuted, p1);

	let rating = document.createElement("p");
	rating.innerHTML = object.rating + '<i class="fa-solid fa-star"></i>';
	rating.id = "rating";

	let wishListButton = document.createElement("div");
	wishListButton.id = "wishListButton";
	wishListButton.innerHTML = `${
		object.wishlist
			? '<i class="fa-solid fa-heart"></i> Wishlisted'
			: '<i class="fa-regular fa-heart"></i> Add to Wishlist'
	} `;
	wishListButton.addEventListener("click", async (e) => {
		let productsFor = JSON.parse(localStorage.getItem("productsFor"));

		const page = document.getElementById("page");

		await addToWishList(object.id);
		const products = await getData(
			URL + `?_page=${+page.innerHTML}&_limit=8&gender=${productsFor}`
		);

		container.innerHTML = "";

		products.forEach((prod) => {
			renderProducts(prod, container);
		});
	});

	if (object.wishlist) wishListButton.classList.add("addedToWishlist");

	card.append(img, bottom, rating, wishListButton);
	container.append(card);
	return card;
}
