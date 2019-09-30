// location.search = location.search + "_" + "querystring";
// let ss = location + "/newURL"

const product = location.search.substr(1).split("_");
const productCategory = product[0];
const productId = product[1];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    if (data[productCategory].length < productId) {
      eror404();
      return;
    }
    changeUrl(data)

    addPointTooBreadcrumbMap(product[0], "#");
    addPointTooBreadcrumbMap(data["drinks"][productId].category, "#");
    addPointTooBreadcrumbMap(data["drinks"][productId].name), "none";
    console.log(breadcrumbMap);
    breadcrumb(breadcrumbMap);
    buildProductPage(data);
  } else if (this.status == 404) {
    eror404();
    return;
  }
};
xmlhttp.open("GET", "../jsons/" + productCategory + ".json", true);
xmlhttp.send();

const eror404 = function () {
  // window.location.href = '/eror404';
  document.getElementsByClassName("product-page")[0].innerHTML =
    "Page not found";
  document
    .getElementsByClassName("product-page")[0]
    .classList.add("product-page-name");
  document
    .getElementsByClassName("product-page")[0]
    .classList.add("product-page-warning");
};

const changeUrl = function (data) {
  let drinkName = data["drinks"][productId].name;
  drinkName = drinkName.replace(/ /g, "-");
  let newLocstion = "?" + product[0] + "_" + product[1] + "_" + drinkName;
  window.history.pushState("object or string", "Page Title", newLocstion);
}

const buildProductPage = function (data) {
  document.getElementsByClassName("product-page-img")[0].src =
    data["drinks"][productId].image;
  document.getElementsByClassName("product-page-img")[0].title =
    data["drinks"][productId].name;

  document.getElementsByClassName("product-page-name")[0].innerHTML =
    data["drinks"][productId].category + " " + data["drinks"][productId].name;
  document.getElementsByClassName("product-page-price")[0].innerHTML =
    data["drinks"][productId].price.toFixed(2) + " uan.";

  const inStock = data["drinks"][productId].inStock;
  if (inStock == true) {
    document.getElementsByClassName("product-page-stock")[0].innerHTML =
      "on the shelf";
    document.getElementsByClassName(
      "product-page-stock-description"
    )[0].innerHTML =
      "The goods are in the store. You can pick it up now (until 21:00) or place a reservation for tomorrow.";
    document.getElementsByClassName("product-page-stock-again")[0].innerHTML =
      "In stock";
  } else {
    document.getElementsByClassName("product-page-stock")[0].innerHTML =
      "on order";
    document.getElementsByClassName(
      "product-page-stock-description"
    )[0].innerHTML =
      "Make a reservation and the product will be available within 48 hours.";
    document.getElementsByClassName("product-page-stock-again")[0].innerHTML =
      "Preorder";
  }

  document.getElementsByClassName(
    "product-page-description-text"
  )[0].innerHTML = data["drinks"][productId].description;
  document.getElementsByClassName("product-properties--utp")[0].innerHTML =
    data["drinks"][productId].UTP;

  document.getElementsByClassName("product-properties--color")[0].innerHTML =
    data["drinks"][productId].color;
  document.getElementsByClassName("product-properties--color")[0].href =
    "#" + data["drinks"][productId].color;

  document.getElementsByClassName("product-properties--style")[0].innerHTML =
    data["drinks"][productId].style;
  document.getElementsByClassName("product-properties--style")[0].href =
    "#" + data["drinks"][productId].style;

  document.getElementsByClassName("product-properties--region")[0].innerHTML =
    data["drinks"][productId].region;
  document.getElementsByClassName("product-properties--region")[0].href =
    "#" + data["drinks"][productId].region;

  document.getElementsByClassName("product-properties--brand")[0].innerHTML =
    data["drinks"][productId].brand;
  document.getElementsByClassName("product-properties--brand")[0].href =
    "#" + data["drinks"][productId].brand;

  document.getElementsByClassName(
    "product-properties--manufacturer"
  )[0].innerHTML = data["drinks"].manufacturer;
  document.getElementsByClassName("product-properties--manufacturer")[0].href =
    "#" + data["drinks"][productId].manufacturer;

  document.getElementsByClassName("product-properties--sort")[0].innerHTML =
    data["drinks"][productId].sort;
  document.getElementsByClassName("product-properties--sort")[0].href =
    "#" + data["drinks"][productId].sort;

  document.getElementsByClassName("product-properties--alcohol")[0].innerHTML =
    data["drinks"][productId].alcohol;
  document.getElementsByClassName("product-properties--volume")[0].innerHTML =
    data["drinks"][productId].volume;
};
