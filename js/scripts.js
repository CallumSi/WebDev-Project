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
}


slidebutton1.addEventListener('click', Slide1)
function Slide1(ev) {
  setSlide(0)
  slidebutton1.classList.remove("buttontransparent");
  slidebutton1.classList.add("buttonwhite");
  slidebutton2.classList.remove("buttonwhite");
  slidebutton3.classList.remove("buttonwhite");
}
slidebutton2.addEventListener('click', Slide2)
function Slide2(ev) {
  setSlide(1)
  slidebutton2.classList.remove("buttontransparent");
  slidebutton2.classList.add("buttonwhite");
  slidebutton1.classList.remove("buttonwhite");
  slidebutton3.classList.remove("buttonwhite");
}
slidebutton3.addEventListener('click', Slide3)
function Slide3(ev) {
  setSlide(2)
  slidebutton3.classList.remove("buttontransparent");
  slidebutton3.classList.add("buttonwhite");
  slidebutton1.classList.remove("buttonwhite");
  slidebutton2.classList.remove("buttonwhite");
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



// search by item name

storeSearch.addEventListener('input', ev =>{
 const sections = Array.from(document.querySelectorAll('#itemstore article')).filter(section =>{
  return !section.dataset.name.includes(storeSearch.value);
 });

 for(const result of document.querySelectorAll('.hidden')){
  result.classList.remove('hidden');
 }
 for(const section of sections){
   if (section.classList.contains('introduction')){
     //pass
   }else{
     section.classList.add('hidden');

   }
 }
});
