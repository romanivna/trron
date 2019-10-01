

const muve = function () {
    let b = location.search.substr(1);
    let a = document.getElementById(b);

    for (let i = 0; i < a.offsetTop; i++) {
        function myFunction() {
            myVar = setTimeout(function () { window.scrollTo(0, i); i++ }, i * 3);
        }

        myFunction();
    }
}
muve()