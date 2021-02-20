"use strict";
//toggle navbar
menuToggler.addEventListener('click', ev =>{
  menuToggler.classList.toggle('open');

});


// slideshow
const slides = document.querySelectorAll('#slides section');
let displayed_slide=0;

function setSlide(slide_number) {
  let displayed = document.querySelector('#slides section.displayed');
  if(displayed) {
      displayed.classList.remove('displayed');
  }
  let visible_slide = slides.item(slide_number);
  if(visible_slide){
    visible_slide.classList.add('displayed');
  }
  slideindicator.textContent = `${slide_number + 1} of ${slides.length}`;
}

next.addEventListener('click', nextSlide)
function nextSlide(ev) {
  displayed_slide++;
  if(displayed_slide >= slides.length){
    displayed_slide=0;
  }
  setSlide(displayed_slide)
}

setSlide(displayed_slide);

//nav change to white on scroll

const img = document.querySelector('header img');
const burgerdiv = document.querySelectorAll('#menuToggler div')
window.onscroll = function () {
if (window.scrollY > 100 ){
    img.classList.add("navwhite");
    img.classList.remove("navtransparent");
    burgerdiv.classList.add("menublack");
    burgerdiv.classList.remove("menuwhite");
  }
  else {
  img.classList.remove("navwhite");
  img.classList.add("navtransparent");
  burgerdiv.classList.remove("menublack");
  burgerdiv.classList.add("menuwhite");
  }
};
