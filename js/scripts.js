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



//slide buttons

const elements = document.querySelectorAll('#slidemanager div');

const toggleWhite = (ev) => {
  let selected = 0;
  if (ev.target.classList.contains("slidebutton1")){selected=1;}
  if (ev.target.classList.contains("slidebutton2")){selected=2;}
  if (ev.target.classList.contains("slidebutton3")){selected=3;}
  for(const element of elements){
      element.classList.remove("buttonwhite")
  }
  ev.target.classList.add("buttonwhite")
  setSlide(selected-1)
}
for (const element of elements) {
  element.addEventListener('click', toggleWhite)
}

setSlide(displayed_slide);


//go between slides with interval
let currentslide=displayed_slide
window.setInterval(function () {
  displayed_slide++
  if (displayed_slide==3){
    displayed_slide=0;

  }
  setSlide(displayed_slide)
}, 5000);



//nav change to white on scroll, bugerdiv changed to black




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
   }else{
     section.classList.add('hidden');

   }
 }
});
