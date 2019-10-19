(function() {
  const HEIGHT_MENU = 50;

  const moveToSection = function() {
    const sectionName = location.search.substr(1);
    const section = document.getElementById(sectionName);
    let moveTo = section.offsetTop - HEIGHT_MENU;
    for (let i = 0; i < moveTo; i++) {
      function move() {
        moveSpeed = setTimeout(function() {
          window.scrollTo(0, i);
        }, i);
      }
      move();
    }
  };
  moveToSection();
})();
