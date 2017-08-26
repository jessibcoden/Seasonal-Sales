console.log("Seasonal Sales");

//define global variables
var departments;
var products;
var productContainer = document.getElementById("product-container");



function readProductFile(){
	console.log("this", this.responseText);//responseText is a property of the element
	var data = JSON.parse(this.responseText);
	console.log(data);
	decidewhatDataType(data.products);
}

function executeErrorMessage(){
	console.log("Shit Broke");
}

//'new' is a constructor
var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", readProductFile);
myRequest.addEventListener("error", executeErrorMessage);
myRequest.open("GET", "products.json");
myRequest.send();

function readDepartmentsFile(){
	console.log("this", this.responseText);//responseText is a property of the element
	var data = JSON.parse(this.responseText);
	console.log(data);
	decidewhatDataType(data.categories);
}

// 'new' is a constructor
var myRequest2 = new XMLHttpRequest();
myRequest2.addEventListener("load", readDepartmentsFile);
myRequest2.addEventListener("error", executeErrorMessage);
myRequest2.open("GET", "departments.json");
myRequest2.send();

//*** First will need to add correlating information from the categories array in the departments.json file to each product***

//because there are two files there's no way to know which will load first - will need to create function to determine which file loads first using a property of one of the array elements ()

//declare varialbe with an initial value of 0 - this will be will be the counter for determining how many times
var decidewhatDataTypeRunNumberOfTimes = 0;

function decidewhatDataType (dataFromArray) {
//set dataType default value to "product"
	var dataType = "product";
	for (var i = 0; i < dataFromArray.length; i ++) {
		if (dataFromArray[i].season_discount) {
			dataType = "category";
		}
	}
	if (dataType === "product") {
		products = dataFromArray;
	} else if (dataType === "category") {
		departments = dataFromArray;
	}

	decidewhatDataTypeRunNumberOfTimes ++;

// Problem: we only want addDepartmentToProduct to run once BOTH sets of data are in
	if (decidewhatDataTypeRunNumberOfTimes === 2) {
		addDepartmentToProduct ();
	}	
}

function addDepartmentToProduct () {
	for (var i = 0; i < products.length; i++) {
//no statements have to be run in first loop - telling it for each project - look at all the departments
		for (var j = 0; j < departments.length; j++) {
			if (departments[j].id === products[i]["category_id"]) {
				products[i].categoryName = departments[j].name;
				products[i].categorySeason = departments[j]["season_discount"];
				products[i].categoryDiscount = departments[j].discount;
			}
		}
	}

	createDomString();
}

//domstring for products

function createDomString (){
	console.log(products);
	var domString = '';
	for (var i = 0; i < products.length; i++){
		domString += `<section id="productCard">`;
		domString +=	`<h3 class="department">${products[i].categoryName}</h3>`;
		domString +=	`<h3 class="name">${products[i].name}</h3>`;
		domString +=	`<h3 class="price">${products[i].price}</h3>`;
		domString += `</section>`	
	}
	writeToDom(domString);
}

function writeToDom (string){
	productContainer.innerHTML = string;
}

// write discount function
var salePrice = document.getElementById("sale-container");

document.body.addEventListener('click', function(event) {
		if(event.target.className === 'seasonChoice1'){
		(displaySalePrice1(event.target));}
		else if(event.target.className === 'seasonChoice2'){
		displaySalePrice2(event);}
		else if(event.target.className === 'seasonChoice3'){
		displaySalePrice3(event);}
	});


function displaySalePrice1 () {
	for (var i = 0; i < products.length; i ++) {
	if(products[i].category_id === 1){
	var discount = products[i].price * 0.10;
	var salePrice = products[i].price - discount;
	salePrice = salePrice.toFixed(2);
	console.log(salePrice);
}
// function winterString () {
// 	var saleString = '';
// 	saleString +=	`<h3 class="sale">Sale Price:${newPrice}</h3>`;

	addToProduct();	
	}
}



function addToProduct (strang){
	salePrice.innerHTML = strang;
}





