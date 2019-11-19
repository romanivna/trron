"use strict";
(function () {

    const filtersInfo = location.search.substr(1).split("$");
    const drinksPosistion = document.querySelector(".drinks-container--drinks");
    const viewPosition = document.querySelectorAll(".drinks-container--view");

    let NUMBER_OF_DRINKS_ON_THE_PAGE = 12;
    let pageNumber = 1
    let sortByPrice = "cheap_first"
    let category;
    breadcrumbs = []
    let activeFilters = []

    filtersInfo.forEach(function (element) {
        if (element.split("=")[0] === "_page") {
            pageNumber = +element.split("=")[1];
            return
        } else if (element.split("=")[0] === "items_per_page") {
            NUMBER_OF_DRINKS_ON_THE_PAGE = +element.split("=")[1];
            return
        } else if (element.split("=")[0] === "sortByPrice") {
            sortByPrice = element.split("=")[1];
            return
        } else if (element.split("=")[0] === "Category") {
            category = element.split("=")[1].replace(/%20/g, " ");
            activeFilters.push(element);
            breadcrumbs.push({
                name: category,
                link: ""
            })
            return
        } else {
            activeFilters.push(element);
            breadcrumbs.unshift({
                name: element.split("=")[1].replace(/%20/g, " "),
                link: "/pages/drinks.html?Сategory=drinks$" + element
            })
            return
        }
    });

    downloadFiltersJson(downloadDrinksJson)

    function downloadFiltersJson() {
        const xmlhttp1 = new XMLHttpRequest();
        xmlhttp1.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const filters = JSON.parse(this.responseText);
                downloadDrinksJson(filters);
            }
        }
        xmlhttp1.open("GET", "../jsons/filters.json", true);
        xmlhttp1.send();
    }

    function downloadDrinksJson(filters) {
        const xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                workWithDownloadInfo(filters, data)

            }
        }
        xmlhttp2.open("GET", "../jsons/drinks.json", true);
        xmlhttp2.send();
    }

    function workWithDownloadInfo(filters, data) {
        bildFiltersButton(filters, activeFilters)
        let filteredDrinks = filterDrinks(data, activeFilters, filters)
        if (sortByPrice === "dear%20first") {
            checkSearchResult(filterDrinksByPrice(filteredDrinks).reverse());
        } else {
            checkSearchResult(filterDrinksByPrice(filteredDrinks))
        }
        addButtonsView(viewPosition);
        addDrinksViewFilters(viewPosition);
        addButtonsGroupDrinks(
            filteredDrinks,
            viewPosition,
            NUMBER_OF_DRINKS_ON_THE_PAGE,
            pageNumber
        );
        addIventLisenetToDrinksViewFilters()
        showFiltersMenyOnSmollDivices();
        removeConteinerDrinksGroupsOnSmollScreen();
        CloseFiltersMenyOnSmollDivices();
        addPointToBreadcrumbMap(breadcrumbs);
    }

    function bildFiltersButton(filters, activeFilters) {
        const filtersPosition = document.querySelector(".drinks-container--filters");
        const filtersContainer = document.createElement('div');
        const category = activeFilters[0].split("=")[1].toLowerCase();

        filters = filters[category].filters

        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                const filterName = document.createElement("div");
                filterName.classList.add("filter-name");
                filterName.innerHTML = filters[key].name;
                filterName.addEventListener('click', function () {
                    this.nextElementSibling.classList.toggle("filter-value-container--show");
                })
                filtersContainer.appendChild(filterName);
                const filterValueContainer = document.createElement("div");
                filterValueContainer.classList.add("filter-value-container");

                filters[key].value.forEach(function (filtredCharacteristicValue) {

                    let activeFilterIndex = false;
                    activeFilters.forEach(function (activeFiltersCharacteristic) {
                        let activeFiltersCharacteristicValue = activeFiltersCharacteristic.split("=")[1].replace(/%20/g, ' ');
                        let activeFiltersCharacteristicName = activeFiltersCharacteristic.split("=")[0].replace(/%20/g, ' ');

                        if (filters[key].name === activeFiltersCharacteristicName & filtredCharacteristicValue.toUpperCase() === activeFiltersCharacteristicValue.toUpperCase()) {

                            const activeFilterWrapper = document.createElement("div");
                            activeFilterWrapper.classList.add("active-filter-wrapper");
                            const closeFilterButton = document.createElement("div");
                            closeFilterButton.classList.add("close-filter-button");
                            closeFilterButton.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
                            closeFilterButton.value = activeFiltersCharacteristic;
                            closeFilterButton.addEventListener("click", function () {

                                let deactivatedFiltersCharacteristic = this.value

                                if (deactivatedFiltersCharacteristic.split("=")[0] === "Category") {
                                    let newActiveFilters = []
                                    activeFilters.forEach(function (element) {
                                        if (element.split("=")[0] === "Category") {
                                            newActiveFilters.push("Category=drinks");
                                        } else {
                                            newActiveFilters.push(element);
                                        }
                                    })
                                    location = "/pages/drinks.html?" + newActiveFilters.toString().replace(/,/g, "$") + "$_page=1";
                                } else {
                                    let newlocation = location.search.substr(1).split("$_")[0].split("$");
                                    newlocation = newlocation.filter(function (value) {
                                        return value !== deactivatedFiltersCharacteristic;
                                    });
                                    location = location.pathname + "?" + newlocation.toString().replace(/,/g, '$');
                                }
                            })
                            const filterValue = document.createElement("div");
                            filterValue.classList.add("filter-value--active");
                            filterValue.innerHTML = filtredCharacteristicValue;
                            activeFilterWrapper.appendChild(closeFilterButton);
                            activeFilterWrapper.appendChild(filterValue)
                            filterValueContainer.appendChild(activeFilterWrapper);
                            activeFilterIndex = true;
                        }
                    })

                    if (!activeFilterIndex) {

                        const filterValue = document.createElement("a");
                        filterValue.classList.add("filter-value");
                        filterValue.innerHTML = filtredCharacteristicValue;
                        filterValue.href = link(filtredCharacteristicValue, filters[key].name, activeFilters);
                        filterValueContainer.appendChild(filterValue);
                    }
                })
                filtersContainer.appendChild(filterValueContainer);
            }
        }
        filtersPosition.appendChild(filtersContainer);
    }

    function link(characteristicname, characteristic, activeFilters) {
        if (characteristic === "Category") {
            let newActiveFilters = []
            activeFilters.forEach(function (element) {
                if (element.split("=")[0] === characteristic) {
                    element = characteristic + "=" + characteristicname;
                    newActiveFilters.push(element);
                } else {
                    newActiveFilters.push(element);
                }
            })
            return ("/pages/drinks.html?" + newActiveFilters.toString().replace(/,/g, "$") + "$_page=1")
        } else {
            return location.pathname + location.search.split("$_")[0] + "$" + characteristic + "=" + characteristicname + "$_page=" + pageNumber;
        }
    }

    function filterDrinks(data, activeFilters, filters) {
        let filteredDrinks = [];
        let filterCategory = activeFilters[0].split("=")[1].replace(/%20/g, " ");
        showCategoryStr(filterCategory)

        if (filterCategory.toUpperCase() === "DRINKS") {
            filteredDrinks = data.drinks;
        } else if (filterCategory === "Wines") {
            filters.wines.category.forEach(function (filtersCategory) {
                filteredDrinks = filteredDrinks.concat(data.drinks.filter(function (x) {
                    return x.category === filtersCategory;
                }));
            });
        } else {
            filteredDrinks = data.drinks.filter(function (x) {
                return x.category.toUpperCase() === filterCategory.toUpperCase();
            });
        }
        return filterDrinksByActiveFilters(filteredDrinks, activeFilters)
    }

    function filterDrinksByActiveFilters(filteredDrinks, activeFilters) {

        let filteredDrinksByActiveFilters = [];

        if (activeFilters.length === 0) {
            return filteredDrinks;
        } else {
            filteredDrinks.forEach(function (drink) {
                let drinkWasFound;
                activeFilters.forEach(function (filter) {
                    if (filter.split("=")[0].replace(/%20/g, ' ') === "items_per_page" || filter.split("=")[0].replace(/%20/g, ' ') === "sortByPrice" || filter.split("=")[0].replace(/%20/g, ' ') === "category") {
                        return
                    } else if (drinkWasFound) {
                        return
                    } else {
                        for (let characteristic in drink.characteristics) {
                            if (drink.characteristics.hasOwnProperty(characteristic)) {
                                if (drink.characteristics[characteristic].name === filter.split("=")[0].replace(/%20/g, ' ')) {
                                    drink.characteristics[characteristic].value.forEach(function (drinkCharacteristicValue) {
                                        if (drinkCharacteristicValue === filter.split("=")[1].replace(/%20/g, ' ')) {

                                            filteredDrinksByActiveFilters.push(drink);
                                            drinkWasFound = true;
                                        }
                                    })
                                }
                            }
                        }

                    }
                })
            });
            if (filteredDrinksByActiveFilters.length !== 0) {
                filteredDrinks = filteredDrinksByActiveFilters;
            }
        }
        return filteredDrinks;
    }

    function checkSearchResult(filteredDrinks) {
        if (filteredDrinks.length < 1 && pageNumber > 1) {
            error404();
        } else if (
            pageNumber > Math.ceil(filteredDrinks.length / NUMBER_OF_DRINKS_ON_THE_PAGE)
        ) {
            error404();
        } else {
            for (
                let drinkNumber =
                    pageNumber * NUMBER_OF_DRINKS_ON_THE_PAGE -
                    NUMBER_OF_DRINKS_ON_THE_PAGE;
                (drinkNumber < NUMBER_OF_DRINKS_ON_THE_PAGE * pageNumber) &
                (drinkNumber < filteredDrinks.length); drinkNumber++
            ) {
                buildDrink(filteredDrinks[drinkNumber], drinksPosistion);
            }
        }
    }

    function filterDrinksByPrice(filteredDrinks) {
        let drinksFilteredByPrice = {};
        filteredDrinks.forEach(function (element) {
            if (!drinksFilteredByPrice[element.price]) {
                drinksFilteredByPrice[element.price] = [element]
            } else {
                let drinkWithOnePrice = drinksFilteredByPrice[element.price];
                drinkWithOnePrice.push(element);
                drinksFilteredByPrice[element.price] = drinkWithOnePrice;
            }
        })
        let foundDrinksFilteredByPrice = [];
        for (let key in drinksFilteredByPrice) {
            if (drinksFilteredByPrice.hasOwnProperty(key)) {
                drinksFilteredByPrice[key].forEach(function (element) {
                    foundDrinksFilteredByPrice.push(element)
                })
            }
        }
        return foundDrinksFilteredByPrice;
    }

    function addIventLisenetToDrinksViewFilters() {
        let filterNumberOfDrinksOnThePageSelect = document.getElementsByClassName("numberOfDrinksOnThePageSelect");
        filterNumberOfDrinksOnThePageSelect = [].map.call(filterNumberOfDrinksOnThePageSelect, function (item) {
            item.addEventListener('change', function () {
                const activeFilters = location.search.substr(1).split("$_")[0].split("$");
                const items_per_page = this.value;
                let newActiveFilters = []
                let indexNumberOfDrinksOnThePageSelect = 0;
                activeFilters.forEach(function (element) {
                    if (element.search("items_per_page=") !== -1) {
                        element = "items_per_page=" + items_per_page;
                        newActiveFilters.push(element);
                        indexNumberOfDrinksOnThePageSelect = 1;
                    } else {
                        newActiveFilters.push(element);
                    }
                })
                if (indexNumberOfDrinksOnThePageSelect === 0) {
                    newActiveFilters.push("items_per_page=" + items_per_page);
                    newActiveFilters.push("sortByPrice=" + sortByPrice);
                }
                location.href = "/pages/drinks.html?" + newActiveFilters.toString().replace(/,/g, "$") + "$_page=1";
            });
        })

        let filterSortByPrice = document.getElementsByClassName("sortByPrice");
        filterSortByPrice = [].map.call(filterSortByPrice, function (item) {
            item.addEventListener('change', function () {
                const activeFilters = location.search.substr(1).split("$_")[0].split("$");
                const sortByPrice = this.value.replace(/ /g, '%20');
                let newActiveFilters = []
                let indexSortByPrice = 0;
                activeFilters.forEach(function (element) {
                    if (element.search("sortByPrice=") !== -1) {
                        element = "sortByPrice=" + sortByPrice;
                        newActiveFilters.push(element);
                        indexSortByPrice = 1;
                    } else {
                        newActiveFilters.push(element);
                    }
                })
                if (indexSortByPrice === 0) {
                    newActiveFilters.push("items_per_page=" + NUMBER_OF_DRINKS_ON_THE_PAGE);
                    newActiveFilters.push("sortByPrice=" + sortByPrice);
                }
                location.href = "/pages/drinks.html?" + newActiveFilters.toString().replace(/,/g, "$") + "$_page=1";
            });
        })
    }

    function addDrinksViewFilters(position) {
        position = [].map.call(position, function (item) {
            const drinksViewFilters = document.createElement("div");
            drinksViewFilters.classList.add("drinksViewFilters");
            const sortByPriceConteiner = document.createElement("div");
            sortByPriceConteiner.classList.add("filters-select");
            sortByPriceConteiner.classList.add("filters-select-sort-by-price");
            sortByPriceConteiner.innerHTML = "Sort:";
            const sortSelect = document.createElement("select");
            sortSelect.classList.add("sortByPrice");
            const OptionCheap = document.createElement("option");
            OptionCheap.innerHTML = "cheap first";
            sortSelect.appendChild(OptionCheap);
            const OptionDear = document.createElement("option");
            OptionDear.innerHTML = "dear first";
            sortSelect.appendChild(OptionDear);
            sortByPriceConteiner.appendChild(sortSelect);
            if (sortByPrice === "dear%20first") {
                sortSelect.selectedIndex = "1";
            } else {
                sortSelect.selectedIndex = "0";
            }

            const numberOfDrinksOnThePage = document.createElement("div");
            numberOfDrinksOnThePage.classList.add("filters-select");
            numberOfDrinksOnThePage.classList.add("filters-number-of-drinks");
            numberOfDrinksOnThePage.innerHTML = "Show:";
            const numberOfDrinksOnThePageSelect = document.createElement("select");
            numberOfDrinksOnThePageSelect.classList.add("numberOfDrinksOnThePageSelect");
            const Option12Drinks = document.createElement("option");
            Option12Drinks.innerHTML = "12";
            numberOfDrinksOnThePageSelect.appendChild(Option12Drinks);
            const Option24Drinks = document.createElement("option");
            Option24Drinks.innerHTML = "24";
            numberOfDrinksOnThePageSelect.appendChild(Option24Drinks);
            const Option48Drinks = document.createElement("option");
            Option48Drinks.innerHTML = "48";
            numberOfDrinksOnThePageSelect.appendChild(Option48Drinks);
            numberOfDrinksOnThePage.appendChild(numberOfDrinksOnThePageSelect);
            switch (+NUMBER_OF_DRINKS_ON_THE_PAGE) {
                case 12:
                    numberOfDrinksOnThePageSelect.selectedIndex = "0";
                    break

                case 24:
                    numberOfDrinksOnThePageSelect.selectedIndex = "1";
                    break

                default:
                    numberOfDrinksOnThePageSelect.selectedIndex = "2";
                    break
            }
            drinksViewFilters.appendChild(sortByPriceConteiner);
            drinksViewFilters.appendChild(numberOfDrinksOnThePage);
            item.appendChild(drinksViewFilters);
        })
    }

    function error404() {
        location.href = "/pages/error404.html";
    }

    function showCategoryStr(category) {
        const categoryStr = document.querySelector(".drinks-container--category-str");
        categoryStr.innerHTML = category;
    }

    function removeConteinerDrinksGroupsOnSmollScreen() {
        const MAX_WIDTH = 760;
        const width = document.querySelector(".drinks-container--drinks")
            .offsetWidth;
        if (width < MAX_WIDTH) {
            document.querySelector(".conteiner--drinksGroups").classList.add("element--none");
        } else {
            document.querySelector(".conteiner--drinksGroups").classList.remove("element--none");
        }
    }

    function CloseFiltersMenyOnSmollDivices() {
        const ButtonCloseFilters = document.querySelector(".button-filters-list--close");
        ButtonCloseFilters.addEventListener("click", function () {
            const filtersConteiner = document.querySelector(".drinks-container--filters");
            filtersConteiner.classList.remove("drinks-container--filters--show");
            document.querySelector("body").classList.remove("block-scroll");
        })
    }

    function showFiltersMenyOnSmollDivices() {
        const drinksButtonFilters = document.querySelector(".drinks-button--filters");
        drinksButtonFilters.addEventListener("click", function () {
            const filtersConteiner = document.querySelector(".drinks-container--filters");
            filtersConteiner.classList.add("drinks-container--filters--show");
            document.querySelector("body").classList.add("block-scroll");
        })

        const HEIGHT_TO_BUTTON_FILTERS = 373;
        window.addEventListener("scroll", function () {
            const scroll = pageYOffset;
            if (scroll > HEIGHT_TO_BUTTON_FILTERS) {
                drinksButtonFilters.classList.add("drinks-button--filters--Fixed");
                document.querySelector(".container--view").classList.add("container--view--none")
            } else {
                drinksButtonFilters.classList.remove("drinks-button--filters--Fixed");
                document.querySelector(".container--view").classList.remove("container--view--none")
            }
        });
    }

    window.addEventListener("resize", function () {
        const MIN_WIDTH = 480;
        const MAX_WIDTH = 760;
        const width = document.querySelector(".drinks-container--drinks")
            .offsetWidth;
        const drinkContainerInTableWiev =
            document.querySelectorAll(".drink--table");

        if (width < MAX_WIDTH & width > MIN_WIDTH) {
            drinkContainerInTableWiev.forEach(function (element) {
                element.classList.add("drink--table--md");
            })
        } else {
            drinkContainerInTableWiev.forEach(function (element) {
                element.classList.remove("drink--table--md");
            })
        }

        if (width < MAX_WIDTH) {
            document.querySelector(".conteiner--drinksGroups").classList.add("element--none");
        } else {
            document.querySelector(".conteiner--drinksGroups").classList.remove("element--none");
        }

        if (width < MIN_WIDTH) {
            document.querySelectorAll(".filters-select-sort-by-price")[1].classList.add("element--none");
        } else {
            document.querySelectorAll(".filters-select-sort-by-price")[1].classList.remove("element--none");
        }
    });
})()