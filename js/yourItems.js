 "use strict";
 let pageSize = 12;
 let currentPage =1;
 let yourItemsArray;
//toggle navbar
menuToggler.addEventListener('click', ev =>{
  menuToggler.classList.toggle('open');
});

//nav change change to white on scroll, bugerdiv changed to black

window.onscroll = function () {
  const header = document.querySelector('header');
  const navA = document.querySelectorAll('header nav a');
  const burgerdivs = document.querySelectorAll('#menuToggler div');
  if (window.scrollY > 50 ){
    for(const burgerdiv of burgerdivs){
        burgerdiv.classList.add("menublack")
        burgerdiv.classList.remove("menuwhite")}
    for(const navitem of navA){
    navitem.classList.add("navitemblack")}
    header.classList.add("navwhite")
  }else{
    for(const burgerdiv of burgerdivs){
    burgerdiv.classList.remove("menublack")
    burgerdiv.classList.add("menuwhite")}

    for(const navitem of navA){
    navitem.classList.remove("navitemblack")
    header.classList.remove("navwhite")}
    }
};










//start of API


 async function loadObject() {
  const url = `https://corsanywhere.herokuapp.com/https://steamcommunity.com/inventory/76561198094515936/252490/2?l=english&count=5000`;
  const response = await fetch(url);
  return response.json();
 }

 async function loadSpecific(name) {
   const url = `https://corsanywhere.herokuapp.com/https://steamcommunity.com/market/priceoverview/?country=GB&currency=2&appid=252490&market_hash_name=${name.replace(/ /g, '%20')}`;
     //const response = await fetch(url);
      fetch(url).then(handleSuccess)
      //return response.json();

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
    const markethistory =  loadSpecific(specificitem.name)
      let marketplacename = specificitem.name
      marketplacelink.text = "Marketplace";
      marketplacelink.href = "https://steamcommunity.com/market/listings/252490/"+ marketplacename
      marketplacelink.text = "Not Purchaceable"


   let specificworkshoplink= "test";
   try{
      specificworkshoplink=specificitem.actions[0].link
     workshoplink.text = "Workshop";
   }
   catch(err) {
     workshoplink.text = "Facepunch Item";
     specificworkshoplink= "https://rustlabs.com/skin/" + (specificitem.name.replace(/ /g,"-").toLowerCase());
   }
   workshoplink.href = specificworkshoplink;
  //  const dataname = (Object.entries(temp)[0][1].tags[1]);


   //add each item
   article.appendChild(img);
   article.appendChild(h3);
   article.classList.add("youritem");
   article.appendChild(marketplacelink);
   article.appendChild(workshoplink);
   //article.setAttribute("data", dataname);



   return article;
 }

function handleSuccess(data){
   console.log("SUCCESS")
    return data.json();
}

function handleError(error){
  console.log("Failed")
    console.log(error)
}



async function insertArticles(search) {
     let attemptToSearchFailed=false;
     loader.classList.add("waiting");
     // get list of items in INVENTORY
     const obj = await loadObject();

     //loop through each item
     yourItemsArray = obj.descriptions;

     if(search != ""){
        attemptToSearchFailed=true;
       for (const a of yourItemsArray){
         let name=a.market_name;
         name=name.toLowerCase();
         name=name.replace(/ /g,'')
           if(name==search){
             attemptToSearchFailed=false;
             yourItemsArray=[];
             yourItemsArray.push(a)
           }
       }
     }

     let myObjects = yourItemsArray.slice((currentPage - 1) * pageSize, currentPage * pageSize);
     if(attemptToSearchFailed==true){
       count.textContent = "No results found";
       myObjects=[];
     }
     else{
       count.textContent = "found " + yourItemsArray.length + " results for " + search;
     }

     nPages.textContent = Math.ceil(yourItemsArray.length / pageSize);
     // set the currentPage
     for(const item of myObjects){
     const article = buildArticleFromData(item);
     yourItems.appendChild(article);
   }
}

async function loadPage(search) {
  pageIndicator.textContent = currentPage;
  loader.classList.add("waiting");
  clearyourItems();
  await insertArticles(search);
  loader.classList.remove("waiting");
  const loaderText = document.querySelector("#loaderText");
  loaderText.classList.add("hidden");
}

function clearyourItems() {
  while(yourItems.childNodes.length > 3) {
    yourItems.lastChild.remove();
  }
}

function nextPage() {
  currentPage += 1;
  const nPages = Math.ceil(yourItemsArray.length / pageSize);
  if(currentPage > nPages) { currentPage = 1;}
  loadPage("");
}
function prevPage() {
  currentPage -= 1;
  const nPages = Math.ceil(yourItemsArray.length / pageSize);
  if(currentPage < 1) { currentPage = nPages;}
  loadPage("");
}
prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);



//search bar

searchButton.addEventListener('click', ev =>{
   let searchcriteria = itemSearch.value;
   searchcriteria=searchcriteria.toLowerCase();
   searchcriteria=searchcriteria.replace(/ /g,'')
   loadPage(searchcriteria)
 });

loadPage("")
