var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    var drink = data[productCategory][productId].additionalDescription;
    for (key in drink) {
      if (drink.hasOwnProperty(key)) {
        if (!drink[key]) {
        } else {
          buildDetailButton(drink);
          bildDetailvaluecontainers(drink);
        }
      }
    }
    addClickEventListenerToButtons(drink);
    const PRODUCT_DETAILS_CHANGES_POSITION_WHEN_WIDTH = 1000;
    if (windowWidth() > PRODUCT_DETAILS_CHANGES_POSITION_WHEN_WIDTH) {
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
  if (typeof drink[key] == "object" && !Array.isArray(drink[key])) {
    if (drink.hasOwnProperty(key)) {
      ifValueObject(drink[key], containerColumn, containerRow)
    }
  } else if (Array.isArray(drink[key])) {
    ifValueArray(drink[key], containerColumn, containerRow)
  } else {
    ifValueString(drink[key], containerColumn, containerRow);
  }
};

const ifValueObject = function (value, containerColumn, containerRow) {
  let drinkKey = value;
  let valuecontainerColumn = document.createElement("div");
  let valuecontainerRow = document.createElement("div");
  let key = "";
  for (key in drinkKey) {
    if (drinkKey.hasOwnProperty(key)) {
      showKey(key, valuecontainerColumn)
      showKey(key, valuecontainerRow)
      if (Array.isArray(drinkKey[key])) {
        forEachArrayElement(drinkKey[key], valuecontainerColumn, valuecontainerRow);
      } else {
        showArrayElement(drinkKey[key], valuecontainerColumn)
        showArrayElement(drinkKey[key], valuecontainerRow)
      }
    }
  }
  containerColumn.appendChild(addPlacementClassesToElement(valuecontainerColumn, "column"));
  containerRow.appendChild(addPlacementClassesToElement(valuecontainerRow, "row"));
}

const ifValueArray = function (value, containerColumn, containerRow) {
  let valuecontainerColumn = document.createElement("div");
  let valuecontainerRow = document.createElement("div");
  forEachArrayElement(value, valuecontainerColumn, valuecontainerRow);
  containerColumn.appendChild(addPlacementClassesToElement(valuecontainerColumn, "column"));
  containerRow.appendChild(addPlacementClassesToElement(valuecontainerRow, "row"));
}

const forEachArrayElement = function (value, valuecontainerColumn, valuecontainerRow) {
  value.forEach(function (element) {
    showArrayElement(element, valuecontainerColumn)
    showArrayElement(element, valuecontainerRow)
  })
}

const ifValueString = function (value, containerColumn, containerRow) {
  showStringValue(value, containerColumn, "column");
  showStringValue(value, containerRow, "row");
}

const showStringValue = function (value, container, position) {
  let valuecontainerRow = document.createElement("div");
  valuecontainerRow.innerHTML = value;
  container.appendChild(addPlacementClassesToElement(valuecontainerRow, position));
}

const showKey = function (key, container) {
  let specialistrow = document.createElement("div");
  specialistrow.innerHTML = key;
  specialistrow.classList.add("details-notes--italic");
  container.appendChild(specialistrow);
}

const showArrayElement = function (value, container) {
  let textrow = document.createElement("div");
  textrow.innerHTML = value;
  textrow.classList.add("details-notes--margin");
  container.appendChild(textrow);
}

const addPlacementClassesToElement = function (elem, placing) {
  elem.classList.add("product-details-value--" + placing);
  elem.classList.add("product-details-value--" + placing + "--none");
  elem.classList.add("product-details-value--" + placing + "--" + key);
  return elem;
}

const addClickEventListenerToButtons = function () {
  let productDetails = document.getElementsByClassName("details-button");
  productDetails = [].map.call(productDetails, function (item) {
    item.addEventListener("click", function () {
      const SIZE_FOR_PRODUCT_DETAILS_IN_COLUMN = 769;
      if (windowWidth() > SIZE_FOR_PRODUCT_DETAILS_IN_COLUMN) {
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