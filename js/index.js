let breadcrumbMap = {};

const addPointTooBreadcrumbMap = function (point, link) {
    breadcrumbMap[point] = link;
}

const breadcrumb = function (breadcrumbMap) {
    document.getElementsByClassName("breadcrumb--wrapper")[0].classList.remove("breadcrumb--none");
    const d = document.getElementsByClassName("breadcrumb")[0]
    const c = document.createElement("span")
    c.innerHTML = "»";
    let a = document.createElement("a")
    a.innerHTML = "Main";

    a.href = "/"
    d.appendChild(a);
    d.appendChild(c);
    for (key in breadcrumbMap) {
        if (breadcrumbMap.hasOwnProperty(key)) {
            if (!breadcrumbMap[key]) {
                a = document.createElement("span")
                a.innerHTML = key;
                d.appendChild(a);
            } else {
                a = document.createElement("a")
                const c = document.createElement("span")
                c.innerHTML = "»";
                a.innerHTML = key;
                a.href = "#"
                d.appendChild(a);
                d.appendChild(c);
            }
        }
    }
}