const product = location.search.substr(1).split("_");
const productCategory = product[0];
const productId = product[1];
var drink = "";

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    drink = data["drinks"][productId].additionalDescription;
    for (key in drink) {
      if (drink[key] == "") {
      } else {
        bildDetailButton();
        bildDetailvalueConteiners();
      }
    }
    clickButton();
    if (windowWidth() > 769) {
      let a = document.getElementsByClassName("details-description")[0];
      a.click();
    }
  }
};
xmlhttp.open("GET", "jsons/" + productCategory + ".json", true);
xmlhttp.send();

const bildDetailButton = function() {
  var productDetails = document.getElementsByClassName("product-details")[0];
  let detailButton = document.createElement("div");
  detailButton.innerHTML = key;
  detailButton.classList.add("details-" + key);
  detailButton.classList.add("details-button");
  productDetails.appendChild(detailButton);
};

const bildDetailvalueConteiners = function() {
  const conteinerSmoll = document.getElementsByClassName("product-details")[0];
  const conteinerBig = document.getElementsByClassName(
    "product-details-value"
  )[0];
  if (Object.prototype.toString.call(drink[key]) == "[object Object]") {
    let drinkKey = drink[key];
    let valueConteinerSmoll = document.createElement("div");
    valueConteinerSmoll.classList.add("product-details-value--smoll");
    valueConteinerSmoll.classList.add("product-details-value--smoll--none");
    valueConteinerSmoll.classList.add("product-details-value--smoll--" + key);
    let valueConteinerBig = document.createElement("div");
    valueConteinerBig.classList.add("product-details-value--big");
    valueConteinerBig.classList.add("product-details-value--big--none");
    valueConteinerBig.classList.add("product-details-value--big--" + key);
    for (key in drinkKey) {
      let specialistSmoll = document.createElement("div");
      specialistSmoll.innerHTML = key;
      specialistSmoll.classList.add("details-notes--italic");
      valueConteinerSmoll.appendChild(specialistSmoll);

      let specialistBig = document.createElement("div");
      specialistBig.innerHTML = key;
      specialistBig.classList.add("details-notes--italic");
      valueConteinerBig.appendChild(specialistBig);

      if (Object.prototype.toString.call(drinkKey[key]) == "[object Array]") {
        for (i = 0; i < drinkKey[key].length; i++) {
          let textSmoll = document.createElement("div");
          textSmoll.innerHTML = drinkKey[key][i];
          textSmoll.classList.add("details-notes--margin");
          valueConteinerSmoll.appendChild(textSmoll);
          let textBig = document.createElement("div");
          textBig.innerHTML = drinkKey[key][i];
          textBig.classList.add("details-notes--margin");
          valueConteinerBig.appendChild(textBig);
        }
      } else {
        let feedbackSmoll = document.createElement("div");
        feedbackSmoll.innerHTML = drinkKey[key];
        feedbackSmoll.classList.add("details-notes--margin");
        valueConteinerSmoll.appendChild(feedbackSmoll);

        let feedbackBig = document.createElement("div");
        feedbackBig.innerHTML = drinkKey[key];
        feedbackBig.classList.add("details-notes--margin");
        valueConteinerBig.appendChild(feedbackBig);
      }
    }
    conteinerSmoll.appendChild(valueConteinerSmoll);
    conteinerBig.appendChild(valueConteinerBig);
  } else if (Object.prototype.toString.call(drink[key]) == "[object Array]") {
    let valueConteinerSmoll = document.createElement("div");
    valueConteinerSmoll.classList.add("product-details-value--smoll");
    valueConteinerSmoll.classList.add("product-details-value--smoll--none");
    valueConteinerSmoll.classList.add("product-details-value--smoll--" + key);
    let valueConteinerBig = document.createElement("div");
    valueConteinerBig.classList.add("product-details-value--big");
    valueConteinerBig.classList.add("product-details-value--big--none");
    valueConteinerBig.classList.add("product-details-value--big--" + key);
    for (i = 0; i < drink[key].length; i++) {
      let textSmoll = document.createElement("div");
      textSmoll.innerHTML = drink[key][i];
      textSmoll.classList.add("details-notes--margin");
      valueConteinerSmoll.appendChild(textSmoll);
      let textBig = document.createElement("div");
      textBig.innerHTML = drink[key][i];
      textBig.classList.add("details-notes--margin");
      valueConteinerBig.appendChild(textBig);
    }
    conteinerSmoll.appendChild(valueConteinerSmoll);
    conteinerBig.appendChild(valueConteinerBig);
  } else {
    let valueConteinerSmoll = document.createElement("div");
    valueConteinerSmoll.innerHTML = drink[key];
    valueConteinerSmoll.classList.add("product-details-value--smoll");
    valueConteinerSmoll.classList.add("product-details-value--smoll--none");
    valueConteinerSmoll.classList.add("product-details-value--smoll--" + key);
    conteinerSmoll.appendChild(valueConteinerSmoll);
    let valueConteinerBig = document.createElement("div");
    valueConteinerBig.innerHTML = drink[key];
    valueConteinerBig.classList.add("product-details-value--big");
    valueConteinerBig.classList.add("product-details-value--big--none");
    valueConteinerBig.classList.add("product-details-value--big--" + key);
    conteinerBig.appendChild(valueConteinerBig);
  }
};

const clickButton = function() {
  const productDetails = document.getElementsByClassName("details-button");
  Array.from(productDetails).forEach(function(item) {
    item.addEventListener("click", function() {
      if (windowWidth() > 769) {
        remuveClass();
        this.classList.add("details-button-active--big");
        let valueConteiner = document
          .getElementsByClassName(
            "product-details-value--big--" + this.innerHTML
          )[0]
          .classList.toggle("product-details-value--big--none");
      } else {
        this.classList.toggle("details-button-active--smoll");
        document
          .getElementsByClassName(
            "product-details-value--smoll--" + this.innerHTML
          )[0]
          .classList.toggle("product-details-value--smoll--none");
      }
    });
  });
};

const remuveClass = function() {
  const productDetails = document.getElementsByClassName("product-details")[0]
    .children;
  for (i = 0; i < productDetails.length; i++) {
    productDetails[i].classList.remove("details-button-active--big");
  }
  const productValueBig = document.getElementsByClassName(
    "product-details-value"
  )[0].children;
  for (i = 0; i < productValueBig.length; i++) {
    productValueBig[i].classList.add("product-details-value--big--none");
  }
};

const windowWidth = function() {
  const width = document.getElementsByClassName("content-width")[0].offsetWidth;
  return width;
};

// fix fo IE (now he know what is from)
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}
