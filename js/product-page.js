(function () {
  const product = location.search.substr(1).split("_");
  const productCategory = product[0];
  let productId = Number(product[1]);
  const productName = product[2];

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      const drink = data["drinks"].find(x => x.id === productId);
      if (drink == undefined) {
        error404();
        return;
      }
      breadcrumbs = [
        { name: product[0], link: "#" },
        { name: drink.category, link: "#" },
        { name: drink.name, link: "" }
      ];
      addPointToBreadcrumbMap(breadcrumbs);
      buildProductPage(drink);
      if (!productName) {
        changeUrl(drink);
      }

      if (drink == undefined) {
        error404();
        return;
      }
    } else if (this.status == 404) {
      error404();
      return;
    }
  };
  xmlhttp.open("GET", "../jsons/" + productCategory + ".json", true);
  xmlhttp.send();

  function error404() {
    location.href = "/pages/error404.html";
  }

  const changeUrl = function (drink) {
    const drinkName = drink.name;
    drinkName = drinkName.replace(/ /g, "-");
    const newLocation = "?" + product[0] + "_" + product[1] + "_" + drinkName;
    window.history.pushState("object or string", "Page Title", newLocation);
  };

  const buildProductPage = function (drink) {
    document.getElementsByClassName("product-page-img")[0].src = drink.image;
    document.getElementsByClassName("product-page-img")[0].title = drink.name;

    document.getElementsByClassName("product-page-name")[0].innerHTML =
      drink.category + " " + drink.name;
    document.getElementsByClassName("product-page-price")[0].innerHTML =
      drink.price.toFixed(2) + " uan";

    const inStock = drink.inStock;
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
      "product-page-characteritics-text"
    )[0].innerHTML = drink.description;

    showCharacteristics(drink);
  };

  const showCharacteristics = function (drink) {
    productCharacteristics = drink.characteristics;
    for (key in productCharacteristics) {
      if (productCharacteristics.hasOwnProperty(key)) {
        const characteristicsConteiner = document.getElementsByClassName(
          "product-page-characteristics"
        )[0];
        if (productCharacteristics[key].link === true) {
          const container = document.createElement("div");
          container.classList.add("characteritics-container");
          showPropertyName(productCharacteristics[key].name, container);

          if (Array.isArray(productCharacteristics[key].value)) {
            productCharacteristics[key].value.forEach(function (element) {
              showPropertyValueButton(element, container);
              showPropertyValueSeparator(container);
            });
            characteristicsConteiner.appendChild(container);
          } else {
            showPropertyValueButton(
              productCharacteristics[key].value,
              container
            );
            characteristicsConteiner.appendChild(container);
          }
        } else {
          const container = document.createElement("div");
          container.classList.add("characteritics-container");
          showPropertyName(productCharacteristics[key].name, container);
          showPropertyValue(productCharacteristics[key].value, container);
          characteristicsConteiner.appendChild(container);
        }
      }
    }
  };
  const showPropertyName = function (name, container) {
    const characteriticsName = document.createElement("span");
    characteriticsName.innerHTML = name + ": ";
    characteriticsName.classList.add("product-characteritics");
    container.appendChild(characteriticsName);
  };
  const showPropertyValueButton = function (value, container) {
    const characteristicValue = document.createElement("a");
    characteristicValue.innerHTML = value;
    characteristicValue.href = "#" + value;
    characteristicValue.classList.add("product-characteritics--valueLink");
    container.appendChild(characteristicValue);
  };
  const showPropertyValue = function (value, container) {
    const characteristicValue = document.createElement("span");
    characteristicValue.innerHTML = value;
    characteristicValue.classList.add("product-characteritics--value");
    container.appendChild(characteristicValue);
  };
  const showPropertyValueSeparator = function (container) {
    const separator = document.createElement("span");
    separator.innerHTML = ",";
    container.appendChild(separator);
  };
})();
