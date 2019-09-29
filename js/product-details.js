var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    var drink = data[productCategory][productId].additionalDescription;
    for (key in drink) {
      if (drink[key] === "") {
      } else {
        buildDetailButton(drink);
        bildDetailvaluecontainers(drink);
      }
    }
    clickButton(drink);
    if (windowWidth() > 769) {
      let activeFirstButton = document.getElementsByClassName("details-description")[0];
      activeFirstButton.click();
    }
  }
};
xmlhttp.open("GET", "../jsons/" + productCategory + ".json", true);
xmlhttp.send();

const buildDetailButton = function (drink) {
  var productDetails = document.getElementsByClassName("product-details")[0];
  let detailButton = document.createElement("div");
  detailButton.innerHTML = key;
  detailButton.classList.add("details-" + key);
  detailButton.classList.add("details-button");
  productDetails.appendChild(detailButton);
};

const bildDetailvaluecontainers = function (drink) {
  var containerColumn = document.getElementsByClassName("product-details")[0];
  var containerRow = document.getElementsByClassName(
    "product-details-value"
  )[0];
  if (typeof drink[key] == "object" && Array.isArray(drink[key]) != true) {
    containerIfValueObject(drink[key], containerColumn, containerRow)
  } else if (Array.isArray(drink[key])) {
    containerIfValueArray(drink[key], containerColumn, containerRow)
  } else {
    containerIfValueLine(drink[key], containerColumn, containerRow);
  }
};

const containerIfValueObject = function (value, containerColumn, containerRow) {
  let drinkKey = value;
  let valuecontainerColumn = document.createElement("div");
  let valuecontainerRow = document.createElement("div");
  for (key2 in drinkKey) {
    if (drinkKey.hasOwnProperty(key2)) {
      buildValueKey(key2, valuecontainerColumn)
      buildValueKey(key2, valuecontainerRow)
      if (Array.isArray(drinkKey[key2])) {
        forrEachArrayValue(drinkKey[key2], valuecontainerColumn, valuecontainerRow);
      } else {
        buildArrayValue(drinkKey[key2], valuecontainerColumn)
        buildArrayValue(drinkKey[key2], valuecontainerRow)
      }
    }
  }
  containerColumn.appendChild(containerAddClass(valuecontainerColumn, "column"));
  containerRow.appendChild(containerAddClass(valuecontainerRow, "row"));
}

const containerIfValueArray = function (a, containerColumn, containerRow) {
  let valuecontainerColumn = document.createElement("div");
  let valuecontainerRow = document.createElement("div");
  forrEachArrayValue(a, valuecontainerColumn, valuecontainerRow);
  containerColumn.appendChild(containerAddClass(valuecontainerColumn, "column"));
  containerRow.appendChild(containerAddClass(valuecontainerRow, "row"));
}

const forrEachArrayValue = function (a, valuecontainerColumn, valuecontainerRow) {
  a.forEach(function (element) {
    buildArrayValue(element, valuecontainerColumn)
    buildArrayValue(element, valuecontainerRow)
  })
}

const containerIfValueLine = function (a, containerColumn, containerRow) {
  buildValueLine(a, containerColumn, "column");
  buildValueLine(a, containerRow, "row");
}

const buildValueLine = function (a, container, position) {
  let valuecontainerRow = document.createElement("div");
  valuecontainerRow.innerHTML = a;
  container.appendChild(containerAddClass(valuecontainerRow, position));
}

const buildValueKey = function (key, container) {
  let specialistrow = document.createElement("div");
  specialistrow.innerHTML = key;
  specialistrow.classList.add("details-notes--italic");
  container.appendChild(specialistrow);
}

const buildArrayValue = function (value, container) {
  let textrow = document.createElement("div");
  textrow.innerHTML = value;
  textrow.classList.add("details-notes--margin");
  container.appendChild(textrow);
}

const containerAddClass = function (elem, placing) {
  elem.classList.add("product-details-value--" + placing);
  elem.classList.add("product-details-value--" + placing + "--none");
  elem.classList.add("product-details-value--" + placing + "--" + key);
  return elem;
}

const clickButton = function () {
  let productDetails = document.getElementsByClassName("details-button");
  productDetails = [].map.call(productDetails, function (item) {
    item.addEventListener("click", function () {
      const SIZE_FOR_product_details_IN_column = 769;
      if (windowWidth() > SIZE_FOR_product_details_IN_column) {
        removeClass();
        this.classList.add("details-button-active--row");
        let valuecontainer = document
          .getElementsByClassName(
            "product-details-value--row--" + this.innerHTML
          )[0]
          .classList.toggle("product-details-value--row--none");
      } else {
        this.classList.toggle("details-button-active--column");
        document
          .getElementsByClassName(
            "product-details-value--column--" + this.innerHTML
          )[0]
          .classList.toggle("product-details-value--column--none");
      }
    });
  });
};

const removeClass = function () {
  const productDetails = document.getElementsByClassName("product-details")[0]
    .children;
  for (i = 0; i < productDetails.length; i++) {
    productDetails[i].classList.remove("details-button-active--row");
  }
  const productValuerow = document.getElementsByClassName(
    "product-details-value"
  )[0].children;
  for (i = 0; i < productValuerow.length; i++) {
    productValuerow[i].classList.add("product-details-value--row--none");
  }
};

const windowWidth = function () {
  return document.getElementsByClassName("content-width")[0].offsetWidth;
};