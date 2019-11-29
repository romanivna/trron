"use strict";

(function () {
    showButtonScrollToTop()
    window.addEventListener('scroll', function () {
        const scroll = pageYOffset;
        if (scroll != 0) {
            document.querySelector(".scroll-to--top").classList.remove("scroll-to--top--none");
        } else {
            document.querySelector(".scroll-to--top").classList.add("scroll-to--top--none");
        }
    })

    function showButtonScrollToTop() {
        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.classList.add("scroll-to--top");
        scrollToTopButton.classList.add("scroll-to--top--none");
        scrollToTopButton.onclick = function () {
            const scroll = pageYOffset;
            for (let i = scroll; i >= 0; i--) {
                function muveTop() {
                    window.scrollTo(0, i);
                }
                let time = (scroll - i) / 3;
                setTimeout(muveTop, time);
            }
        };
        scrollToTopButton.innerHTML = '<i class="fas fa-2x fa-angle-up"></i>';
        window.document.body.appendChild(scrollToTopButton);
    }
})()