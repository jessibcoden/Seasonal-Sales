console.log("anything?");

function runAfterProductsLoads(){
	console.log("this", this);
	var productData = JSON.parse(this.responseText).products;
	getDepartments(productData);
}

function shitBroke(){
	console.log("WHAT'D YOU DO???");
}

var myProducts = new XMLHttpRequest();
myProducts.addEventListener("load", runAfterProductsLoads);
myProducts.addEventListener("error", shitBroke);
myProducts.open("GET", "products.json");
myProducts.send();

function getDepartments(products){
	var myDepartments = new XMLHttpRequest();
	myDepartments.addEventListener("load", runAfterDepartmentsLoads);
	myDepartments.addEventListener("error", shitBroke);
	myDepartments.open("GET", "departments.json");
	myDepartments.send();

	function runAfterDepartmentsLoads(){
		var departmentData = JSON.parse(this.responseText).categories;
		combineArray(products, departmentData)
		console.log("departments", departmentData);
		console.log("products next to departments", products);
	}
}

function combineArray(productsArray, departmentsArray){
	productsArray.forEach(function(product){
		var currentDepartmentId = product["category_id"];
		departmentsArray.forEach(function(department){
			if(currentDepartmentId === department.id){
				product["department"] = department.name;
				product["season"] = department["season_discount"];
				product["discount"] = department.discount;
				product["amountOff"] = product.price * department.discount;
				product["salePrice"] = product.price - product.amountOff;
				product.salePrice = product.salePrice.toFixed(2);
			}
		});
	});
	domString(productsArray);
	determineDiscount(productsArray);
}

function domString(products){
	// console.log(products);
	var domString = '';
	for (var i = 0; i < products.length; i++){
		domString += `<section id="productCard" class="${products[i].onSale ? 'sale' : 'no-sale'}">`;
		domString +=	`<h3 class="department">${products[i].department}</h3>`;
		domString +=	`<h3 class="name">${products[i].name}</h3>`;
		domString +=	`<img class="image" src=${products[i].img}>`
		domString +=	`<h3 class="price">&#36;${products[i].price}</h3>`;
		domString +=	products[i].onSale ? `<h3 class="sale-price">Sale Price: &#36;${products[i].salePrice}</h3>` : "<h3></h3>";
		domString += `</section>`;	
		console.log("sale prices", products[i].salePrice);
	}
	writeToDom(domString);	
}

function writeToDom (string){
	document.getElementById("product-container").innerHTML = string;
}

var season = document.getElementById("seasons");
var showDiscounts = document.getElementById("show-discounts")

function determineDiscount(productsArray){
	season.addEventListener("change", function(event){
		console.log("event", event);
		var selectedSeason = parseInt(season.value);
		productsArray.forEach(function(product){
			product.onSale = false;
			if(product.category_id === selectedSeason){
				product.onSale = true;
			}
			if(selectedSeason === 0 && product["salePrice"] != undefined){
				product.onSale = false;
			}
		})
		console.log("product array", productsArray);
		domString(productsArray);
	});
}









