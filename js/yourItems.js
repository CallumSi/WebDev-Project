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
        async function loadObject(userID) {
          const url = `https://corsanywhere.herokuapp.com/https://steamcommunity.com/inventory/${userID}/252490/2?l=english&count=5000`;
          const response = await fetch(url);
          return response.json();
        }

        async function loadSpecific(name) {
          let lowestprice = null;
          const url = `https://corsanywhere.herokuapp.com/https://steamcommunity.com/market/priceoverview/?country=GB&currency=2&appid=252490&market_hash_name=${name.replace(/ /g, '%20')}`;
          const response = await fetch(url);

          //  try{
          // lowestprice=(Object.entries(response)[0][1]);
          //  }
          //catch{
          // lowestprice = "-1";
          //}

          //return lowestprice;
          //return response.json();
          if (response.ok) {
            return response.json();
          } else {
            console.log("No Price Found")
            return "";
          }
        }


        //Convert object data into DOM elements
        function buildArticleFromData(specificitem, markethistory) {
          //create the  elements
          const article = document.createElement("article");
          const h3 = document.createElement("h3");
          const img = document.createElement("img");
          const marketplacelink = document.createElement("a")
          const workshoplink = document.createElement("a")
          //acesssing the data
          h3.innerText=(specificitem.name);
          img.src=("https://steamcommunity-a.akamaihd.net/economy/image/"  + specificitem.icon_url_large);
          try{

            marketplacelink.text = markethistory;

          }
          catch{
            marketplacelink.text = "Facepunch Item";
            specificworkshoplink= "https://rustlabs.com/skin/" + (specificitem.name.replace(/ /g,"-").toLowerCase());
          }




          let marketplacename = specificitem.name

          marketplacelink.href = "https://steamcommunity.com/market/listings/252490/"+ marketplacename
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
          //add each item
          article.appendChild(img);
          article.appendChild(h3);
          article.classList.add("youritem");
          article.appendChild(marketplacelink);
          article.appendChild(workshoplink);
          return article;
        }





        async function insertArticles(search, userID) {
          let attemptToSearchFailed=false;
          loader.classList.add("waiting");
          // get list of items in INVENTORY
          const obj = await loadObject(userID);
          //loop through each item
          try{
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
              let markethistory = await loadSpecific(item.name)
              if(markethistory.lowest_price == ""){
                markethistory.lowest_price = "Free Item";
              }
              const article = buildArticleFromData(item, markethistory.lowest_price);
              yourItems.appendChild(article);
              loader.classList.remove("hidden");
            }
          }
          catch{
            count.textContent = "No results found";
          }
        }

        async function loadPage(search, userID) {
          pageIndicator.textContent = currentPage;
          loader.classList.add("waiting");
          clearyourItems();
          await insertArticles(search, userID);
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
          let userID = playerSearch.value;
          currentPage += 1;
          const nPages = Math.ceil(yourItemsArray.length / pageSize);
          if(currentPage > nPages) { currentPage = 1;}
          loadPage("", userID);
        }
        function prevPage() {
          let userID = playerSearch.value;
          currentPage -= 1;
          const nPages = Math.ceil(yourItemsArray.length / pageSize);
          if(currentPage < 1) { currentPage = nPages;}
          loadPage("", userID);
        }
        prev.addEventListener('click', prevPage);
        next.addEventListener('click', nextPage);



        //search bar

        searchButton.addEventListener('click', ev =>{
          let searchcriteria = itemSearch.value.toLowerCase();
          let userID = playerSearch.value;
          searchcriteria=searchcriteria.replace(/ /g,'')
          loadPage(searchcriteria, userID)
        });


        //ID event listener
        playerSearchButton.addEventListener('click', ev =>{
          let userID = playerSearch.value;
          loadPage("", userID)
        });
