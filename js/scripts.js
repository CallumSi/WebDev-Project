"use strict";

//toggle navbar

menuToggler.addEventListener('click', ev => {
    slideManager.classList.toggle('hidden')
    menuToggler.classList.toggle('open');
});

//code to close the nav when navigating to the same page

itemstoreButton.addEventListener('click', ev => {
    menuToggler.classList.remove('open');
});

//change the what the nav looks like on scroll

window.onscroll = function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav a');
    const menuTogglerdivs = document.querySelectorAll('#menuToggler div');
    if (window.scrollY > 100) {
        for (const menuTogglerdiv of menuTogglerdivs) {
            menuTogglerdiv.classList.add("menuBlack")
        }
        for (const navLink of navLinks) {
            navLink.classList.add("navLinkBlack")
        }
        header.classList.add("headerWhite")
    } else {
        for (const menuTogglerdiv of menuTogglerdivs) {
            menuTogglerdiv.classList.remove("menuBlack")
        }
        for (const navLink of navLinks) {
            navLink.classList.remove("navLinkBlack")
        }
        header.classList.remove("headerWhite")
    }
};

// set the slideshow to a given slide

const slides = document.querySelectorAll('#slides section');

function setSlide(slide_number) {
    let displayed = document.querySelector('#slides section.displayed');
    if (displayed) {
        displayed.classList.remove('displayed');
    }
    let visible_slide = slides.item(slide_number);
    if (visible_slide) {
        visible_slide.classList.add('displayed');
    }
}

//slide button functionality

let selected = 0;
const elements = document.querySelectorAll('#slideManager div');
const toggleWhite = (ev) => {
    if (ev.target.id == ("slidebutton1")) {
        selected = 0;
    }
    if (ev.target.id == ("slidebutton2")) {
        selected = 1;
    }
    if (ev.target.id == ("slidebutton3")) {
        selected = 2;
    }
    for (const element of elements) {
        element.classList.remove("buttonWhite")
    }
    ev.target.classList.add("buttonWhite")
    setSlide(selected)
}
for (const element of elements) {
    element.addEventListener('click', toggleWhite)
}

//go between slides with interval

window.setInterval(function() {
    selected++;
    for (const element of elements) {
        element.classList.remove("buttonWhite")
    }
    if (selected == 3) {
        selected = 0;
    }
    if (selected == 0) {
        slidebutton1.classList.add("buttonWhite")
    }
    if (selected == 1) {
        slidebutton2.classList.add("buttonWhite")
    }
    if (selected == 2) {
        slidebutton3.classList.add("buttonWhite")
    }
    setSlide(selected);
}, 5000);

// search by item name

storeSearch.addEventListener('input', ev => {
    const sections = Array.from(document.querySelectorAll('#itemstore article')).filter(section => {
        return !section.dataset.name.includes(storeSearch.value.toLowerCase());
    });
    for (const result of document.querySelectorAll('.hidden')) {
        result.classList.remove('hidden');
    }
    for (const section of sections) {
        if (section.classList.contains('searchbar')) {
            //pass
        } else {
            section.classList.add('hidden');
        }
    }
    loaderText.classList.add("hidden");
});



//start of API

//loads differnt api URL's
async function loadObject(url) {
    const response = await fetch(url);
    return response.json();
}


//Convert object data into DOM elements
function buildArticleFromData(specificitem, id, price) {
    //deconstruct the array
    const temp = ((Object.entries(specificitem)[0][1]))
    //create the  elements
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const storelink = document.createElement("a")
    const workshoplink = document.createElement("a")
    //acessing the data
    const datatag = (Object.entries(temp)[0][1].tags[1]);
    const specificworkshoplink = (Object.entries(temp)[0][1].actions[0].link);
    const dataname = (Object.entries(temp)[0][1].name);
    h3.innerText = (Object.entries(temp)[0][1].name);
    h4.innerText = (Object.entries(temp)[0][1].tags[0].name);
    img.src = ("https://steamcommunity-a.akamaihd.net/economy/image/" + Object.entries(temp)[0][1].icon_url_large);
    storelink.text = "£" + (price / 100).toFixed(2);
    storelink.href = "https://store.steampowered.com/itemstore/252490/detail/" + id + "/"
    storelink.target = "_blank";
    workshoplink.text = "View";
    workshoplink.href = specificworkshoplink;
    workshoplink.target = "_blank";
    //add each item
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(storelink);
    article.appendChild(workshoplink);
    article.classList.add("storeitem");
    article.setAttribute("data-name", dataname.toLowerCase());
    return article;
}


//function to insert articles into the page
async function insertArticles() {
    loader.classList.add("waiting");
    //get list of items in store
    const obj = await loadObject("https://corsanywhere.herokuapp.com/https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/?key=DF7C9821FA297EB257123E68B0E9E1DD&appid=252490");
    //loop through each item
    const itemStoreObjects = obj.result.assets;
    for (const storeitem of itemStoreObjects) {
        //search the specific item via its id
        const specificitem = await loadObject(`https://corsanywhere.herokuapp.com/https://api.steampowered.com/ISteamEconomy/GetAssetClassInfo/v1/?key=DF7C9821FA297EB257123E68B0E9E1DD&appid=252490&class_count=1&classid0=${storeitem.classid}`);
        const article = buildArticleFromData(specificitem, storeitem.name, storeitem.original_prices.GBP);
        itemstore.appendChild(article);
    }
}

//loads the page
async function loadPage() {
    loader.classList.add("waiting");
    await insertArticles();
    loader.classList.remove("waiting");
    loaderText.classList.add("hidden");
}

//load the page on startup
loadPage()
