const searchName = location.search.substr(1).split("_");
breadcrumbs = [{ name: searchName, link: "" }];
addPointToBreadcrumbMap(breadcrumbs);