window.addEventListener('scroll', function() {
  let scroll = pageYOffset;
  let width = screen.width;
  if ( scroll > 150 && width > 884 ){
      document.getElementsByClassName("header-wraper--grey")[0].classList.add("header-wraper--grey--fixed");
      document.getElementsByClassName("header-nav-menu-name")[0].classList.add("header-nav-menu-name--none");
      document.getElementsByClassName("header-nav-scroll")[0].classList.add("header-nav-scroll--show");
      document.getElementsByClassName("header-nav-catalog")[0].classList.add("header-nav-catalog--unset");
      document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.add("header-nav-catalog-list-list--scroll");
  }
  if ( scroll < 149 ){
      document.getElementsByClassName("header-wraper--grey")[0].classList.remove("header-wraper--grey--fixed");
      document.getElementsByClassName("header-nav-menu-name")[0].classList.remove("header-nav-menu-name--none");
      document.getElementsByClassName("header-nav-scroll")[0].classList.remove("header-nav-scroll--show");
      document.getElementsByClassName("header-nav-catalog")[0].classList.remove("header-nav-catalog--unset");
      document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.remove("header-nav-catalog-list-list--scroll");
  }
});