(function() {
  breadcrumbs = [{ name: "drinks", link: "#" }];
  addPointTooBreadcrumbMap(breadcrumbs);
  const HEIGHT_MENU = 100;

  const muveToSection = function() {
    const sectionName = location.search.substr(1);
    const section = document.getElementById(sectionName);
    const muveTo = section.offsetTop - HEIGHT_MENU;
    for (let i = 0; i < muveTo; i++) {
      function muve() {
        myVar = setTimeout(function() {
          window.scrollTo(0, i);
          i++;
        }, i * 2);
      }
      muve();
    }
  };
  muveToSection();
})();
