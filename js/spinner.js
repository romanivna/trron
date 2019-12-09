"use strict";

(function () {
    let conteiner = document.createElement("div");
    conteiner.classList.add("container-spinner");
    let spinner = document.createElement("div");
    spinner.classList.add("spinner");
    conteiner.appendChild(spinner);
    let position = document.body;
    position.insertAdjacentElement('afterbegin', conteiner);
    position.classList.add("body--block");
    window.addEventListener("load", function () {
        conteiner.classList.add("container-spinner--none");
        position.classList.remove("body--block");
    });
})()