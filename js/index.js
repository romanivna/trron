const addPointToBreadcrumbMap = function (breadcrumbs) {
  document
    .getElementsByClassName("breadcrumb--wrapper")[0]
    .classList.remove("breadcrumb--none");
  const container = document.getElementsByClassName("breadcrumb")[0];
  const separator = document.createElement("span");
  separator.innerHTML = "»";
  let breadcrumbButton = document.createElement("a");
  breadcrumbButton.innerHTML = "Main";
  breadcrumbButton.href = "/";
  container.appendChild(breadcrumbButton);
  container.appendChild(separator);

  breadcrumbs.forEach(function (element) {
    if (element.link === "") {
      breadcrumbButton = document.createElement("span");
      const separator = document.createElement("span");
      separator.innerHTML = "»";
      breadcrumbButton.innerHTML = element.name;
      container.appendChild(breadcrumbButton);
      container.appendChild(separator);
    } else {
      breadcrumbButton = document.createElement("a");
      const separator = document.createElement("span");
      separator.innerHTML = "»";
      breadcrumbButton.innerHTML = element.name;
      breadcrumbButton.href = element.link;
      container.appendChild(breadcrumbButton);
      container.appendChild(separator);
    }
  });
  let lastElement = container.childElementCount - 1;
  container.removeChild(container.childNodes[lastElement]);
};
let breadcrumbs = [{
  name: "name",
  link: "#"
}];

const logInfo = [true, "userName"];

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
    if (NUMBER_OF_DRINKS_ON_THE_PAGE > foundDrinks.length) {
      item.appendChild(container);
    } else if (pageNumber === 1) {
      addButtonsWhitchShowActiveGroupOfFoundDrinks(container, pageNumber);
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
      addButtonsWhitchShowActiveGroupOfFoundDrinks(container, pageNumber);
    } else {
      addButtonWhichShowsThePreviousGroupOfFoundDrinks(container, pageNumber);
      addButtonsWhitchShowSpecifiedGroupOfFoundDrinks(
        container,
        "-1",
        pageNumber,
        numberOfProductPages
      );
      addButtonsWhitchShowActiveGroupOfFoundDrinks(container, pageNumber);
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
    location.href = location.search.split("$_")[0] + "$_page=" + number;
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
    location.href = location.search.split("$_")[0] + "$_page=" + number;
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
    location.href = location.search.split("$_")[0] + "$_page=" + number;
  });
  container.appendChild(button);
}

function addButtonsWhitchShowActiveGroupOfFoundDrinks(container, value) {
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