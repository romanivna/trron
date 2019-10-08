let searchName = location.search.substr(1).replace(/%20/g, " ");
breadcrumbs = [{ name: searchName, link: "" }];
addPointToBreadcrumbMap(breadcrumbs);

searchName = searchName.toUpperCase();

const searchDrink = function() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      data.drinks.forEach(function(element) {
        let drinkName = element.name.toUpperCase();
        if (drinkName === searchName) {
        } else {
          if (drinkName.search(searchName) !== -1) {
            showDrink(element);
          }
        }
      });
    }
  };
  xmlhttp.open("GET", "../jsons/drinks.json", true);
  xmlhttp.send();
};
searchDrink();

const chengeView = function(form) {
  alert(form);
  if (form === "table") {
    document
      .getElementsByClassName("view-button-table")[0]
      .classList.add("view-button--active");
    document
      .getElementsByClassName("view-button-table")[1]
      .classList.add("view-button--active");
    document
      .getElementsByClassName("view-button-row")[0]
      .classList.remove("view-button--active");
    document
      .getElementsByClassName("view-button-row")[1]
      .classList.remove("view-button--active");
  } else {
    document
      .getElementsByClassName("view-button-table")[0]
      .classList.remove("view-button--active");
    document
      .getElementsByClassName("view-button-table")[1]
      .classList.remove("view-button--active");
    document
      .getElementsByClassName("view-button-row")[0]
      .classList.add("view-button--active");
    document
      .getElementsByClassName("view-button-row")[1]
      .classList.add("view-button--active");
  }
};

const showDrink = function(element) {
  console.log(element.id);
  let position = document.getElementsByClassName("search-container--drinks")[0];
  let container = document.createElement("div");
  container.classList.add("drink");
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("drink-img");

  let link = document.createElement("a");
  let containerInfo = document.createElement("div");
  containerInfo.classList.add("drink-info");

  let img = document.createElement("img");
  img.src = element.image;
  img.title = element.name;
  link.href = "/pages/drink.html?drinks_" + element.id;
  link.appendChild(img);
  imgContainer.appendChild(link);
  container.appendChild(imgContainer);

  let containerName = document.createElement("a");
  containerName.innerHTML = element.category + " " + element.name;
  containerName.classList.add("drink-name");
  containerName.href = "/pages/drink.html?drinks_" + element.id;
  containerInfo.appendChild(containerName);

  let containerLitrage = document.createElement("div");
  containerLitrage.innerHTML = element.litrage;
  containerLitrage.classList.add("drink-litrage");
  containerInfo.appendChild(containerLitrage);

  let containerPrice = document.createElement("div");
  containerPrice.innerHTML = element.price + ".00 uan";
  containerPrice.classList.add("drink-price");
  containerInfo.appendChild(containerPrice);

  let containerDescription = document.createElement("div");
  containerDescription.innerHTML = element.description;
  containerDescription.classList.add("drink-description");
  containerInfo.appendChild(containerDescription);

  let containerInStock = document.createElement("div");
  const inStock = element.inStock;
  if (inStock == true) {
    containerInStock.innerHTML = "in stock";
  } else {
    containerInStock.innerHTML = "not in stock";
  }
  containerInStock.classList.add("drink-Stock");
  containerInfo.appendChild(containerInStock);

  let containerButtons = document.createElement("div");
  containerButtons.classList.add("buttons-container");
  let buttonCart = document.createElement("button");
  buttonCart.classList.add("button-cart");
  buttonCart.innerHTML = "add to cart";
  let buttonWishlist = document.createElement("button");
  buttonWishlist.classList.add("button-wishlist");

  containerButtons.appendChild(buttonCart);
  containerButtons.appendChild(buttonWishlist);
  containerInfo.appendChild(containerButtons);

  container.appendChild(containerInfo);
  position.appendChild(container);
};
