"use strict";

menuToggler.addEventListener('click', ev =>{
  menuToggler.classList.toggle('open');

});

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
