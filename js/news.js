"use strict";

//toggle navbar
menuToggler.addEventListener('click', ev =>{
  menuToggler.classList.toggle('open');
});

//change the what the nav looks like on scroll

window.onscroll = function () {
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('header nav a');
  const menuTogglerdivs = document.querySelectorAll('#menuToggler div');
  if (window.scrollY > 100 ){
    for(const menuTogglerdiv of menuTogglerdivs){menuTogglerdiv.classList.add("menuBlack")}
    for(const navLink of navLinks){navLink.classList.add("navLinkBlack")}
    header.classList.add("headerWhite")
  }else{
    for(const menuTogglerdiv of menuTogglerdivs){menuTogglerdiv.classList.remove("menuBlack")}
    for(const navLink of navLinks){navLink.classList.remove("navLinkBlack")}
    header.classList.remove("headerWhite")
  }
};
