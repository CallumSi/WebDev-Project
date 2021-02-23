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

//nav change to white on scroll, bugerdiv changed to black

const header = document.querySelector('header');
const burgerdiv1 = document.querySelector('.burgerdiv1')
const burgerdiv2 = document.querySelector('.burgerdiv2')
const burgerdiv3 = document.querySelector('.burgerdiv3')
window.onscroll = function () {
if (window.scrollY > 100 ){
    header.classList.add("navwhite");
    header.classList.remove("navtransparent");
    burgerdiv1.classList.add("menublack");
    burgerdiv1.classList.remove("menuwhite");
    burgerdiv2.classList.add("menublack");
    burgerdiv2.classList.remove("menuwhite");
    burgerdiv3.classList.add("menublack");
    burgerdiv3.classList.remove("menuwhite");
  }
  else {
  header.classList.remove("navwhite");
  header.classList.add("navtransparent");
  burgerdiv1.classList.remove("menublack");
  burgerdiv1.classList.add("menuwhite");
  burgerdiv2.classList.remove("menublack");
  burgerdiv2.classList.add("menuwhite");
  burgerdiv3.classList.remove("menublack");
  burgerdiv3.classList.add("menuwhite");
  }
};
