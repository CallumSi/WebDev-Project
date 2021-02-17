"use strict";

menuToggler.addEventListener('click', ev =>{
  menuToggler.classList.toggle('open');

});

const slides = document.querySelectorAll('#slides section');

function setSlide(slide_number) {
  let displayed = document.querySelector('#slides section.displayed');
  if(displayed) {
      displayed.classList.remove('displayed');
  }
  let visible_slide = slides.item(slide_number);
  if(visible_slide){
    visible_slide.classList.add('displayed');
  }
}

setSlide(0);
