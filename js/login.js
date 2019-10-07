let form = document.forms.login;
let useresArrObj;
(function () {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            useresArrObj = JSON.parse(xhr.response);
            breadcrumbs = [{
                name: "name",
                link: "#"
            }]
            addPointTooBreadcrumbMap()
        }
    };
    xhr.open("GET", "../jsons/users.json", true);
    xhr.send();
})();

function logIn(event) {
    event.preventDefault();

    console.log('works')
}