My idea for this website stems from my interest for virtual marketable game items for the game Rust.
In this game players can choose to change how their clothing or weapons look by purchasing these items.
A weekly item store sells these items for a limited time on steams website.
After one week the items in the store can no longer be purchased and a new set of items are made available.
In light of this my website acts as a news page to inform players on the new items available per week.
This is displayed on the first page index.html.
This page Uses an API to retrieve all the items from the current week.
From here users can view the original artwork for the item or purchase the item using the appropriate buttons.

The second page is the youritems page. From here a player can enter their specific steamid into the search and retrieve
a list of all the items they have purchased. It is important to note this only works with a VALID steamid.
For demonstration purposes the search bar is supplied with an existing valid id.
This functionality is achieved through a second API.
From here you can also search through the list of items. Try search something simple such as white.

The last page is the news page, this page details any updates on the game itself to help provide some insight into the development of the game.

Each page has a javascript file associated with it to facilitate any functionality. Additionally all three pages make use of once style sheet "styles.css".

IMPORTANT
As previously discussed the website makes use of multiple API's.
To achieve this a PROXY server has been appended to the API Url to avoid any CORS errors.
Consequently , this has made my websites functionality vulnerable as it is reliant on the proxy server.


In the event of the PROXY not working this error will be displayed :
Access to fetch at 'https://corsanywhere.herokuapp.com/https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/?key=DF7C9821FA297EB257123E68B0E9E1DD&appid=252490' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

In the case of the API no displaying , please either try again later or use this fix:

The URLS in the async function insertArticles() in scripts.js and the URL in the async function loadObject must be changed from:
This ->https://corsanywhere.herokuapp.com ...
To This - >>https://cors-anywhere.herokuapp.com ...

This is a demo version so before running temporary access must be gained by clicking the button on this link.
https://cors-anywhere.herokuapp.com/corsdemo
