// importing navbar here
import { navbar } from "../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();
localStorage.setItem("loggedIn", JSON.stringify(""));

var card = document.getElementById("card");
function openregister() {
	card.style.transform = "rotateY(-180deg)";
}
function openlogin() {
	card.style.transform = "rotateY(0deg)";
}
document.getElementById("signup-btn").addEventListener("click", openregister);
document.getElementById("sigin-btn").addEventListener("click", openlogin);

//form-validation
document
	.getElementById("signUp-button")
	.addEventListener("click", checkcredentials);

let arr = JSON.parse(localStorage.getItem("userDetails")) || [];
function checkcredentials() {
	let name = document.getElementById("name").value;
	let registermobile = document.getElementById("registermobileno").value;
	// let createpass = document.getElementById('create-password').value;
	let confirmpass = document.getElementById("confirm-password").value;

	let obj = {
		registermobile: registermobile,
		name,
		password: confirmpass,
	};
	if (registermobile == "null" || name == "" || confirmpass == "") {
		alert("enter all details");
	} else {
		arr.push(obj);
		localStorage.setItem("userDetails", JSON.stringify(arr));
		alert("Registration successfull");
		openlogin();
	}
}

document.getElementById("login-button").addEventListener("click", logincheck);

function logincheck() {
	console.log("inside login check");
	let loginmobile = document.getElementById("mobileno").value;
	let loginpassword = document.getElementById("password").value;
	let data = JSON.parse(localStorage.getItem("userDetails"));
	let login = false;
	let matchmobile = false;

	let userName = "";
	data.map((elem) => {
		if (loginmobile == elem.registermobile && loginpassword == elem.password) {
			login = true;
			userName = elem.name;
		} else if (loginmobile == elem.registermobile) {
			matchmobile = true;
		}
	});
	if (loginmobile == "" || loginpassword == "") {
		alert("All Fields are Mandatory");
	} else if (login) {
		alert("Login Successfull");
		localStorage.setItem("loggedIn", JSON.stringify(userName));
		console.log(userName);
		window.location.href = "../index.html";
	} else if (matchmobile) {
		alert("Wrong Password");
	} else {
		alert("User not Found");
	}
}
