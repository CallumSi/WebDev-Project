"use strict";

//toggle navbar
menuToggler.addEventListener('click', ev =>{
  menuToggler.classList.toggle('open');
});

//nav change change to white on scroll, bugerdiv changed to black

window.onscroll = function () {
  const header = document.querySelector('header');
  const burgerdivs = document.querySelectorAll('#menuToggler div');
  if (window.scrollY > 100 ){
    for(const burgerdiv of burgerdivs){
      burgerdiv.classList.remove("menuwhite")
      burgerdiv.classList.add("menublack")}
      header.classList.add("navwhite")
      header.classList.remove("navtransparent")
    }else{
      for(const burgerdiv of burgerdivs){
        burgerdiv.classList.remove("menublack")
        burgerdiv.classList.add("menuwhite")}
        header.classList.add("navtransparent")
        header.classList.remove("navwhite")
      }

    };

// set the slideshow to a given slide
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

//slide buttons
let selected = 0;
const elements = document.querySelectorAll('#slidemanager div');
const toggleWhite = (ev) => {
  if (ev.target.id==("slidebutton1")){selected=0;}
  if (ev.target.id==("slidebutton2")){selected=1;}
  if (ev.target.id==("slidebutton3")){selected=2;}
  for(const element of elements){
      element.classList.remove("buttonwhite")
  }
  ev.target.classList.add("buttonwhite")
  setSlide(selected)
}
for (const element of elements) {
  element.addEventListener('click', toggleWhite)
}

//go between slides with interval
const slidebutton1 = document.querySelector("#slidebutton1");
const slidebutton2 = document.querySelector("#slidebutton2");
const slidebutton3 = document.querySelector("#slidebutton3");
window.setInterval(function () {
  selected++;
  for(const element of elements){
      element.classList.remove("buttonwhite")
  }
  if (selected==3){
    selected=0;
  }
  if (selected==0){
    slidebutton1.classList.add("buttonwhite")
  }
  if (selected==1){
    slidebutton2.classList.add("buttonwhite")
  }
  if (selected==2){
    slidebutton3.classList.add("buttonwhite")
  }

  setSlide(selected);
}, 5000);

// search by item name

storeSearch.addEventListener('input', ev =>{
 const sections = Array.from(document.querySelectorAll('#itemstore article')).filter(section =>{
  return !section.dataset.name.includes(storeSearch.value);
 });

 for(const result of document.querySelectorAll('.hidden')){
  result.classList.remove('hidden');
 }
 for(const section of sections){
   if (section.classList.contains('searchbar')){
     //pass
   }
   else if (section.classList.contains('filter')){
     //pass
   }else{
     section.classList.add('hidden');

   }
 }
});

//filter
let filtercriteria = "";
const filterbuttons = document.querySelectorAll('.filter li');
const filter = (ev) => {
  for(const filterbutton of filterbuttons){
      filterbutton.classList.remove("buttonwhite");
  }
  if (ev.target.id==("clothingFilterButton")){
    filtercriteria="clothing"
    clothingFilterButton.classList.add("buttonwhite");
    ;}
  if (ev.target.id==("armorFilterButton")){
    filtercriteria="armor"
    armorFilterButton.classList.add("buttonwhite");;}
  if (ev.target.id==("weaponFilterButton")){
    filtercriteria="weapon"
    weaponFilterButton.classList.add("buttonwhite");
    ;}
  if (ev.target.id==("otherFilterButton")){
    filtercriteria="other"
    otherFilterButton.classList.add("buttonwhite");
    ;}
    if (ev.target.id==("clearButton")){
      filtercriteria=""
      // clearButton.classList.add("buttonwhite");
      ;}
  const sections = Array.from(document.querySelectorAll('#itemstore article')).filter(section =>{
  return !section.dataset.name.includes(filtercriteria);
   });

   for(const result of document.querySelectorAll('.hidden')){
    result.classList.remove('hidden');
   }
   for(const section of sections){
     if (section.classList.contains('searchbar')){
       //pass
     }
     else if (section.classList.contains('filter')){
       //pass
     }else{
       section.classList.add('hidden');
     }
   }
};

for (const filterbutton of filterbuttons) {
filterbutton.addEventListener('click', filter)}
