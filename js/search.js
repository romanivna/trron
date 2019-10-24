"use strict";
(function () {
  const searchinfo = location.search.substr(1).split("_");

  if (
    searchinfo[0].split("-")[0] !== "text" ||
    !searchinfo[1] ||
    !searchinfo[1].split("=")[1]
  ) {
    error404();
  }

  let searchName = searchinfo[0].split("-")[1].replace(/%20/g, " ");

  if (searchinfo[1].split("=")[0] !== "page") {
    error404();
  }

  const pageNumber = Number(searchinfo[1].split("=")[1]);

  if (!pageNumber) {
    error404();
  }

  const NUMBER_OF_DRINKS_ON_THE_PAGE = 12;
  const MINIMUM_NUMBER_OF_SYMBOLS_FOR_SEARCH = 0;
  const foundDrinks = [];
  const drinksPosistion = document.getElementsByClassName(
    "search-container--drinks"
  )[0];
  const viewPosition = document.querySelectorAll(".search-container--view");
  const unfulfilledConditionMessagePosition = document.querySelector(
    ".search-container--unfulfilled-condition"
  );
  addValueForSerchInputs();
  if (searchName.length < MINIMUM_NUMBER_OF_SYMBOLS_FOR_SEARCH) {
    breadcrumbs = [];
    addPointToBreadcrumbMap(breadcrumbs);
    addButtonsView(viewPosition);
    showUnfulfilledConditionMessage(unfulfilledConditionMessagePosition);
    showNotMatchMessage();
    return;
  } else {
    breadcrumbs = [{ name: searchName, link: "" }];
    addPointToBreadcrumbMap(breadcrumbs);

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);

        searchDrink(data);
        checkSearchResult(foundDrinks);
        addButtonsView(viewPosition);
        addButtonsGroupDrinks(
          foundDrinks,
          viewPosition,
          NUMBER_OF_DRINKS_ON_THE_PAGE,
          pageNumber
        );
      }
    };
    xmlhttp.open("GET", "../jsons/drinks.json", true);
    xmlhttp.send();
  }

  function addValueForSerchInputs() {
    let elements = document.getElementsByClassName("header-mid-search-input");
    elements = [].map.call(elements, function (item) {
      item.value = searchName;
    });
  }

  function checkSearchResult(foundDrinks) {
    if (foundDrinks.length < 1 && pageNumber > 1) {
      error404();
    } else if (foundDrinks.length < 1) {
      showNotMatchMessage();
    } else if (
      pageNumber > Math.ceil(foundDrinks.length / NUMBER_OF_DRINKS_ON_THE_PAGE)
    ) {
      error404();
    } else {
      for (
        let drinkNumber =
          pageNumber * NUMBER_OF_DRINKS_ON_THE_PAGE -
          NUMBER_OF_DRINKS_ON_THE_PAGE;
        (drinkNumber < NUMBER_OF_DRINKS_ON_THE_PAGE * pageNumber) &
        (drinkNumber < foundDrinks.length);
        drinkNumber++
      ) {
        buildDrink(foundDrinks[drinkNumber], drinksPosistion);
      }
    }
  }

  function searchDrink(data) {
    data.drinks.forEach(function (element) {
      const drinkName = element.name.toUpperCase();
      searchName = searchName.toUpperCase();
      if (drinkName.search(searchName) !== -1) {
        foundDrinks.push(element);
      }
    });
  }

  function error404() {
    location.href = "/pages/error404.html";
  }

  function showNotMatchMessage() {
    const container = document.querySelector(".search-container--drinks");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("not-match-any");
    messageContainer.innerHTML = "Your search did not match any!";
    container.appendChild(messageContainer);
  }

  function showUnfulfilledConditionMessage(elementPosition) {
    buildUnfulfilledConditionMessage(elementPosition);
    activetCloseButton(elementPosition);
  }

  function buildUnfulfilledConditionMessage(elementPosition) {
    const container = document.createElement("div");
    container.classList.add("unfulfilled-condition");

    const message = document.createElement("div");
    message.classList.add("unfulfilled-condition-message");
    message.innerHTML =
      "You must specify at least one keyword consisting of " +
      MINIMUM_NUMBER_OF_SYMBOLS_FOR_SEARCH +
      " or more letters.";

    const closeButton = document.createElement("div");
    closeButton.classList.add("clouse-message");
    closeButton.innerHTML = "×";

    container.appendChild(message);
    container.appendChild(closeButton);
    elementPosition.appendChild(container);
  }

  function activetCloseButton(elementPosition) {
    document
      .querySelector(".clouse-message")
      .addEventListener("click", function () {
        elementPosition.innerHTML = "";
      });
  }
})();

const addButtonsGroupDrinks = function (
  foundDrinks,
  position,
  NUMBER_OF_DRINKS_ON_THE_PAGE,
  pageNumber
) {
  position = [].map.call(position, function (item) {
    const container = document.createElement("div");
    container.classList.add("conteiner--drinksGroups");
    const numberOfDrinks = foundDrinks.length;
    const numberOfProductPages = Math.ceil(
      numberOfDrinks / NUMBER_OF_DRINKS_ON_THE_PAGE
    );
    if (pageNumber === 1) {
      buttonPage(container, pageNumber);
      addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
        container,
        "+1",
        pageNumber,
        numberOfProductPages
      );
      addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
        container,
        "+2",
        pageNumber,
        numberOfProductPages
      );
      addButtonWhichShowsNextGroupOfFoundDrinks(
        container,
        pageNumber,
        numberOfProductPages
      );
    } else if (pageNumber === numberOfProductPages) {
      addButtonWhichShowsThePreviousGroupOfFoundDrinks(container, pageNumber);
      addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
        container,
        "-2",
        pageNumber,
        numberOfProductPages
      );
      addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
        container,
        "-1",
        pageNumber,
        numberOfProductPages
      );
      buttonPage(container, pageNumber);
    } else {
      addButtonWhichShowsThePreviousGroupOfFoundDrinks(container, pageNumber);
      addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
        container,
        "-1",
        pageNumber,
        numberOfProductPages
      );
      buttonPage(container, pageNumber);
      addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
        container,
        "+1",
        pageNumber,
        numberOfProductPages
      );
      addButtonWhichShowsNextGroupOfFoundDrinks(
        container,
        pageNumber,
        numberOfProductPages
      );
    }
    item.appendChild(container);
  });
};

function addButtonWhichShowsThePreviousGroupOfFoundDrinks(
  container,
  pageNumber
) {
  const button = document.createElement("div");
  button.classList.add("group-drink");
  button.innerHTML = "<";
  const number = pageNumber - 1;
  if (number < 1) {
    return;
  }
  button.addEventListener("click", function () {
    location.href = location.search.split("=")[0] + "=" + number;
  });
  container.appendChild(button);
}

function addButtonWhichShowsNextGroupOfFoundDrinks(
  container,
  pageNumber,
  numberOfProductPages
) {
  const button = document.createElement("div");
  button.classList.add("group-drink");
  button.innerHTML = ">";
  const number = pageNumber + 1;
  if (number > numberOfProductPages) {
    return;
  }
  button.addEventListener("click", function () {
    location.href = location.search.split("=")[0] + "=" + number;
  });
  container.appendChild(button);
}

function addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
  container,
  addToNumber,
  pageNumber,
  numberOfProductPages
) {
  const number = pageNumber + Number(addToNumber);
  if (number < 1 || number > numberOfProductPages) {
    return;
  }
  const button = document.createElement("div");
  button.classList.add("group-drink");
  button.innerHTML = number;
  button.title = "To page number " + number;
  button.addEventListener("click", function () {
    location.href = location.search.split("=")[0] + "=" + number;
  });
  container.appendChild(button);
}

function buttonPage(container, value) {
  const button = document.createElement("div");
  button.classList.add("group-drink");
  button.classList.add("group-drink--active");
  button.innerHTML = value;
  container.appendChild(button);
}

function addButtonsView(elementPosition) {
  elementPosition = [].map.call(elementPosition, function (element) {
    buildButtonsView(element);
  });
  addClickEventListenerToButtonsView();
  firstActivateButtonView();
}

function firstActivateButtonView() {
  let view = localStorage.getItem("view");
  if (!view) {
    view = "row";
  }
  let button = document.querySelectorAll(".view-button-" + view);
  button = [].map.call(button, function (item) {
    item.classList.add("view-button--active");
  });
  if (view === "row") {
    let drinkContainers = document.getElementsByClassName("drink--wrapper");
    drinkContainers = [].map.call(drinkContainers, function (item) {
      item.classList.remove("drink--table");
    });
  } else {
    let drinkContainers = document.getElementsByClassName("drink--wrapper");
    drinkContainers = [].map.call(drinkContainers, function (item) {
      item.classList.add("drink--table");
    });
  }
}

function buildButtonsView(elementPosition) {
  const container = document.createElement("div");
  container.classList.add("container--view");

  const buttonTable = document.createElement("div");
  buttonTable.classList.add("view-button");
  buttonTable.classList.add("view-button-table");
  buttonTable.innerHTML = "<i class='fas fa-th'></i>";

  const buttonRow = document.createElement("div");
  buttonRow.classList.add("view-button");
  buttonRow.classList.add("view-button-row");
  buttonRow.innerHTML = "<i class='fas fa-th-list'></i>";

  container.appendChild(buttonTable);
  container.appendChild(buttonRow);
  elementPosition.appendChild(container);
}

function addClickEventListenerToButtonsView() {
  let buttonRow = document.getElementsByClassName("view-button-row");
  let buttonTable = document.getElementsByClassName("view-button-table");
  buttonRow = [].map.call(buttonRow, function (item) {
    item.addEventListener("click", function () {
      localStorage.setItem("view", "row");
      document.location.reload();
    });
  });
  buttonTable = [].map.call(buttonTable, function (item) {
    item.addEventListener("click", function () {
      localStorage.setItem("view", "table");
      document.location.reload();
    });
  });
}

function buildDrink(element, drinksPosistion) {
  const position = drinksPosistion;
  const drinkName = element.name.replace(/ /g, "-");
  const wrapper = document.createElement("div");
  wrapper.classList.add("drink--wrapper");
  const container = document.createElement("div");
  container.classList.add("drink");
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("drink-img");
  const link = document.createElement("a");
  const containerInfo = document.createElement("div");
  containerInfo.classList.add("drink-info");
  const img = document.createElement("img");
  img.src = element.image;
  link.title = element.name;
  link.href = "/pages/drink.html?drinks_" + element.id + "_" + drinkName;
  link.appendChild(img);
  imgContainer.appendChild(link);
  container.appendChild(imgContainer);
  const containerName = document.createElement("a");
  containerName.innerHTML = element.category + " " + element.name;
  containerName.classList.add("drink-name");
  containerName.href =
    "/pages/drink.html?drinks_" + element.id + "_" + drinkName;
  containerInfo.appendChild(containerName);
  const containerLitrageAndPrise = document.createElement("div");
  containerLitrageAndPrise.classList.add("container-litrage-and-prise");
  const containerLitrage = document.createElement("div");
  containerLitrage.innerHTML = element.litrage;
  containerLitrage.classList.add("drink-litrage");
  containerLitrageAndPrise.appendChild(containerLitrage);
  const containerPrice = document.createElement("div");
  containerPrice.innerHTML = element.price + ".00 uan";
  containerPrice.classList.add("drink-price");
  containerLitrageAndPrise.appendChild(containerPrice);
  containerInfo.appendChild(containerLitrageAndPrise);
  const containerDescription = document.createElement("div");
  containerDescription.innerHTML = element.description;
  containerDescription.classList.add("drink-description");
  containerInfo.appendChild(containerDescription);
  const containerInStock = document.createElement("div");
  const inStock = element.inStock;
  if (inStock == true) {
    containerInStock.innerHTML = "in stock";
  } else {
    containerInStock.innerHTML = "not in stock";
  }
  containerInStock.classList.add("drink-Stock");
  containerInfo.appendChild(containerInStock);
  const containerButtons = document.createElement("div");
  containerButtons.classList.add("buttons-container");
  const buttonCart = document.createElement("button");
  buttonCart.classList.add("button-cart");
  buttonCart.innerHTML = "add to cart";
  const buttonWishlist = document.createElement("button");
  buttonWishlist.classList.add("button-wishlist");
  containerButtons.appendChild(buttonCart);
  containerButtons.appendChild(buttonWishlist);
  containerInfo.appendChild(containerButtons);
  container.appendChild(containerInfo);
  wrapper.appendChild(container);
  position.appendChild(wrapper);
}
