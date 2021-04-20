"use strict";

//toggle navbar
menuToggler.addEventListener('click', ev =>{
  slidemanager.classList.toggle('hidden')
  menuToggler.classList.toggle('open');
});

//nav change change to white on scroll, bugerdiv changed to black

window.onscroll = function () {
  const header = document.querySelector('header');
  const navA = document.querySelectorAll('header nav a');
  const burgerdivs = document.querySelectorAll('#menuToggler div');
  if (window.scrollY > 100 ){
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
        const filterbuttons = document.querySelectorAll('.filter div');
        const filter = (ev) => {

          for(const filterbutton of document.querySelectorAll('.filter div.buttonwhite')){
            filterbutton.classList.remove("buttonwhite");
          }
          if (ev.target.id==("clothingFilterButton")){
            filtercriteria="clothing"
            clothingFilterButton.classList.add("buttonwhite");
            ;}
            if (ev.target.id==("armorFilterButton")){
              filtercriteria="armor"
              armorFilterButton.classList.add("buttonwhite");
              ;}
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

                    //start of API



                    async function loadObject() {
                      const url = `https://corsanywhere.herokuapp.com/https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/?key=DF7C9821FA297EB257123E68B0E9E1DD&appid=252490`;
                      const response = await fetch(url);
                      return response.json();
                    }

                    async function loadstoreitem(id) {
                      const url = `https://corsanywhere.herokuapp.com/https://api.steampowered.com/ISteamEconomy/GetAssetClassInfo/v1/?key=DF7C9821FA297EB257123E68B0E9E1DD&appid=252490&class_count=1&classid0=${id}`;
                      const response = await fetch(url);
                      return response.json();
                    }
                    //Convert object data into DOM elements
                    function buildArticleFromData(specificitem, id, price) {
                      //deconstruct the array
                      const temp=((Object.entries(specificitem)[0][1]))
                      //create the  elements
                      const article = document.createElement("article");
                      const h3 = document.createElement("h3");
                      const h4 = document.createElement("h4");
                      const img = document.createElement("img");
                      const storelink = document.createElement("a")
                      const workshoplink = document.createElement("a")
                      //assing them data

                      h3.innerText=(Object.entries(temp)[0][1].name);
                      h4.innerText=(Object.entries(temp)[0][1].tags[0].name);
                      img.src=("https://steamcommunity-a.akamaihd.net/economy/image/"  + Object.entries(temp)[0][1].icon_url_large);
                      const datatag = (Object.entries(temp)[0][1].tags[1]);
                      const specificworkshoplink=(Object.entries(temp)[0][1].actions[0].link)
                      //  try {
                      //    for(const a of (Object.entries(tag)))
                      //    {
                      //      const test= (Object.entries(a)[1])
                      //
                      //      console.log(test)
                      //    }
                      //
                      // }
                      // catch(err) {
                      //   console.log("error")
                      // }
                      const dataname = (Object.entries(temp)[0][1].name) + datatag;
                      // const price = (Object.entries(pricelist)[1].GBP)

                      storelink.text = "£" + (price/100).toFixed(2);
                      storelink.href = "https://store.steampowered.com/itemstore/252490/detail/" + id + "/"
                      workshoplink.text = "View";
                      workshoplink.href = specificworkshoplink;
                      //add each item
                      article.appendChild(img);
                      article.appendChild(h3);
                      article.appendChild(h4);
                      article.appendChild(storelink);
                      article.appendChild(workshoplink);
                      article.classList.add("storeitem");
                      article.setAttribute("data", dataname);
                      return article;
                    }

                    async function insertArticles() {
                      loader.classList.add("waiting");
                      //get list of items in store
                      const obj = await loadObject();
                      //loop through each item
                      const itemstoreobjects = obj.result.assets;
                      for(const storeitem of itemstoreobjects){
                        //search the specific item via its id
                        const specificitem = await loadstoreitem(storeitem.classid);
                        const article = buildArticleFromData(specificitem, storeitem.name, storeitem.original_prices.GBP);
                        itemstore.appendChild(article);
                      }
                    }

                    async function loadPage() {
                      loader.classList.add("waiting");
                      clearItemstore();
                      await insertArticles();

                      loader.classList.remove("waiting");
                      const loaderText = document.querySelector("#loaderText");
                      loaderText.classList.add("hidden");
                    }

                    function clearItemstore() {
                      while(itemstore.childNodes.length > 4) {
                        itemstore.lastChild.remove();

                      }
                    }
                    loadPage()
