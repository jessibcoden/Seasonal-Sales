console.log("Seasonal Sales");

//*** First will need to add correlating information from the categories array in the departments.json file to each product***

//because there are two files there's no way to know which will load first - will need to 
var departments;
var products;
var decidewhatDataTypeRunNumberOfTimes = 0;

function decidewhatDataType (dataFromArray) {
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

	domString.innerHTML;
}

//domstring for products

function domString (productStuff){
	console.log(productStuff);
	var domString = '';
	for (var i = 0; i < productStuff.length; i++){
		domString += `section id="productCard">`;
		domString +=	`<h3 class="price">${productStuff[i].categoryName}</h3>`;
		domString +=	`<h3 class="name">${productStuff[i].name}</h3>`;
		domString +=	`<h3 class="price">${productStuff[i].price}</h3>`;
		domString += `</section>`	
	}
	writeToDom(domString);
}

function writeToDom (string){
	var productContainer = document.getElementById("product-container");
	productContainer.innerHTML = string;
}



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



