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
  const MINIMUM_NUMBER_OF_SYMBOLS_FOR_SEARCH = 3;
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
