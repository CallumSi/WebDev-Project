"use strict";

//declare some variables

let pageSize = 12;
let currentPage =1;
let yourItemsArray;
let searchcriteria = "";

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

//start of API
  async function loadObject(userID) {
  const url = `https://corsanywhere.herokuapp.com/https://steamcommunity.com/inventory/${userID}/252490/2?l=english&count=5000`;
  const response = await fetch(url);
  return response.json();
}

//Convert object data into DOM elements
function buildArticleFromData(specificitem) {
  //create the  elements
  const article = document.createElement("article");
  const h3 = document.createElement("h3");
  const img = document.createElement("img");
  const marketplacelink = document.createElement("a")
  const workshoplink = document.createElement("a")
  //acesssing the data
  h3.innerText=(specificitem.name);
  img.src=("https://steamcommunity-a.akamaihd.net/economy/image/"  + specificitem.icon_url_large);
  marketplacelink.text = "Marketplace";
  marketplacelink.href = "https://steamcommunity.com/market/listings/252490/"+ specificitem.name;
  let specificworkshoplink= "";
  try{
    specificworkshoplink=specificitem.actions[0].link
    workshoplink.text = "Workshop";
    specificworkshoplink= "https://rustlabs.com/skin/" + (specificitem.name.replace(/ /g,"-").toLowerCase());
  }
  catch(err) {
    workshoplink.text = "Facepunch Item";
    specificworkshoplink= "https://rustlabs.com/skin/" + (specificitem.name.replace(/ /g,"-").toLowerCase());
  }
  workshoplink.href = specificworkshoplink;
  workshoplink.target = "_blank";
  marketplacelink.target = "_blank";
  //add each item
  article.appendChild(img);
  article.appendChild(h3);
  article.classList.add("youritem");
  article.appendChild(marketplacelink);
  article.appendChild(workshoplink);
  return article;
}

//function to insert the articles into the pages

async function insertArticles(search, userID) {
  let attemptToSearch=false;
  loader.classList.add("waiting");
  // get list of items in inventory
  const obj = await loadObject(userID);
  //check for search
  try{
    yourItemsArray = obj.descriptions;
    if(search != ""){
      attemptToSearch=true;
      //check to see if search matches any results
      for (const a of yourItemsArray){
        let name=a.market_name;
        name=name.toLowerCase();
        name=name.replace(/ /g,'')
        if(name.includes(search)){
          if(attemptToSearch==true){
            attemptToSearch=false;
            yourItemsArray = [];}
          yourItemsArray.push(a)
        }}}
    //split the results into pages
    let myObjects = yourItemsArray.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    if(attemptToSearch==true){
      count.textContent = "No results found";
      myObjects=[];}
    else{count.textContent = "found " + yourItemsArray.length + " results for " + search;}
    nPages.textContent = Math.ceil(yourItemsArray.length / pageSize);
    // set the currentPage
    for(const item of myObjects){
      const article = buildArticleFromData(item);
      yourItems.appendChild(article);
      loader.classList.remove("hidden");
    }}
  //error handling if search failed or no inventory available for specified userID
  catch{count.textContent = "No results found";}
}

//function to load the page

async function loadPage(search, userID) {
  pageIndicator.textContent = currentPage;
  loader.classList.add("waiting");
  loaderText.classList.remove("hidden");
  clearyourItems();
  await insertArticles(search, userID);
  loader.classList.remove("waiting");
  loaderText.classList.add("hidden");
}

//clear the current list
function clearyourItems() {
  while(yourItems.childNodes.length > 3) {
    yourItems.lastChild.remove();
  }
}

//function to take you to next page

function nextPage() {
  let userID = playerSearch.value;
  currentPage += 1;
  const nPages = Math.ceil(yourItemsArray.length / pageSize);
  if(currentPage > nPages) { currentPage = 1;}
  loadPage(searchcriteria, userID);
}

//function to take you to previous page

function prevPage() {
  let userID = playerSearch.value;
  currentPage -= 1;
  const nPages = Math.ceil(yourItemsArray.length / pageSize);
  if(currentPage < 1) { currentPage = nPages;}
  loadPage(searchcriteria, userID);
}
prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);

//Search bar

searchButton.addEventListener('click', ev =>{
  let userID = playerSearch.value;
  searchcriteria=itemSearch.value.toLowerCase();
  searchcriteria=searchcriteria.replace(/ /g,'');
  if(userID!= ""){

    loadPage(searchcriteria, userID);
  }
  currentPage = 1;
  pageIndicator.innerText = "1";
});

//ID event listener

playerSearchButton.addEventListener('click', ev =>{
  let userID = playerSearch.value;
  searchcriteria=itemSearch.value.toLowerCase();
  searchcriteria=searchcriteria.replace(/ /g,'');
  if(userID!= ""){
    loadPage(searchcriteria, userID)
    pageIndicator.innerText = "1";
  }
  currentPage = 1;
});
