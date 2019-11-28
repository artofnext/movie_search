
const API_URL = "http://www.omdbapi.com/?apikey=b336e268&t=trek";
const API_URL_IMG = "http://img.omdbapi.com/?apikey=[yourkey]&";
const API_KEY = "b336e268";

let searchField = document.getElementById('search');
let typeField = document.getElementById('type');
let searchButton = document.getElementById('search_button');
let searchForm = document.getElementById('movie_search');
let movieList = document.getElementById('movie_list');
// searchButton.addEventListener('click', doRequest);
let xhr = new XMLHttpRequest();

searchForm.onsubmit = function(e) {

	e.preventDefault();
    
    // Compose url
    let url = e.target.action; //domain from action of form
    url += "?apikey=";          
    url += API_KEY;             //API key
    url += "&s=";
    url += searchField.value.trim();// title for search 
    url += "&type=";
    url += typeField.value.trim();  // type

	xhr.open("GET", url);
	xhr.send();
}

xhr.onreadystatechange = function() {
  
    if (this.readyState == 4 && this.status == 200) {
      movieObj = JSON.parse(this.responseText);

      console.log(movieObj);
      // Test local storage functions

      saveMovieObj(movieObj);
        movieList.appendChild(renderHTML(movieObj));
    }
    console.log("Bad responce!");
}

function renderHTML(json) {

    let objHTML = document.createElement("ul");
    let listElement = document.createElement("li");
    listElement.innerHTML = "Try!";
    objHTML.appendChild(listElement);
    // TODO implement

    
    return objHTML;
}

function saveMovieObj(json) {
    //TODO implement
    //Should save json object to Local Storage
    window.localStorage.setItem('aont_movie_obj', JSON.stringify(json));
}

function retrieveMovieObj() {
    //TODO implement
    //Should return json object from Local Storage
    return JSON.parse(window.localStorage.getItem("aont_movie_obj"));
}

function isMovieObjExist() {
    //TODO implement
    //Should return if movie list saved to local storage
    return !!(window.localStorage.getItem("aont_movie_obj"));
}





function doRequest(event) {

    let input = searchField.value.trim();
    let type = typeField.value.trim();

    console.log('Input: ' + input);
    console.log('type: ' + type);

    // fetch(API_URL)
    //     .then(response => {
    //         console.log("RESPONSE:", response);

    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log(data);
    //         document.getElementById('debug').innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
    //         // document.write("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
    //     })
    //     .catch(err => {
    //         console.log("ERROR:", err.toString())
    //     });
}
