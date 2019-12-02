
const API_URL = "http://www.omdbapi.com/";
// const API_URL_IMG = "http://img.omdbapi.com/?apikey=[yourkey]&";
const API_KEY = "b336e268";
const LOCAL_MOV_OBJ = "aont_movie_obj";
const LOCAL_QUERY_OBJ = "aont_query";

let page = 1;
let url = "";

let nextButton = document.createElement("button");
    nextButton.classList.add("button");
    nextButton.classList.add("center");
    nextButton.id = "show_more";
    nextButton.classList.add("center");
    nextButton.innerText = "Show more!";
    nextButton.addEventListener("click", showNextPage);

let searchField = document.getElementById('search');
let typeField = document.getElementById('type');
let searchButton = document.getElementById('search_button');
let searchForm = document.getElementById('movie_search');
let movieList = document.getElementById('movie_list');
let xhr = new XMLHttpRequest();

//Initial 
if (isMovieObjExist(LOCAL_MOV_OBJ)) {
    let movieObj = retrieveMovieObj(LOCAL_MOV_OBJ);
    movieList.appendChild(renderHTML(movieObj));
    addNextButton(movieList);
}

if (isMovieObjExist(LOCAL_QUERY_OBJ)) {
    url = retrieveMovieObj(LOCAL_QUERY_OBJ);
}

searchForm.onsubmit = function (e) {

    e.preventDefault();

    // Compose url
    url = e.target.action; //domain from action of form
    url += "?apikey=";
    url += API_KEY;             //API key
    url += "&s=";
    url += searchField.value.trim();// title for search 
    url += "&type=";
    url += typeField.value.trim();  // type
    url += "&page=";
    url += page;

    if (!!document.getElementById("result_list")) {
        document.getElementById("movie_list").removeChild(document.getElementById("result_list"));
    }
    saveMovieObj(LOCAL_QUERY_OBJ, url);

    xhr.open("GET", url);
    xhr.send();
}

xhr.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        movieObj = JSON.parse(this.responseText);

        saveMovieObj(LOCAL_MOV_OBJ, movieObj);
        movieList.appendChild(renderHTML(movieObj));
        addNextButton(movieList);
    }
    console.log("Bad response!");
}

function renderHTML(json) {

    let movieListHTML = document.createElement("ul");
    movieListHTML.classList.add("a-container");
    movieListHTML.id = "result_list";

    let searchResponse = document.createElement("h2");
    searchResponse.classList.add("search_response");
    searchResponse.id = "search_response";

    if (json['Response'] == "True") {
        searchResponse.innerText = "Search results:";
    } else {
        searchResponse.innerText = json['Error'];
        searchResponse.classList.add("alert");
        movieListHTML.appendChild(searchResponse);
        return movieListHTML;
    }
    movieListHTML.appendChild(searchResponse);

    let listNodes = generateListHTML(json);
    for (let item of listNodes) {
        movieListHTML.appendChild(item);
    }

    return movieListHTML;
}

/**
 * @param DOM node
 */
function addNextButton(node) {
    
    node.appendChild(nextButton);
}

function showNextPage(e) {
    //TODO check if is not list end
    page++;
    if (page > 100) { //API alloved only up to 100 pages pagination
        return;
    }

    let index = url.lastIndexOf("&page=");
    let urlBase = url.slice(0, index);
    url = urlBase + "&page=" + page;
    saveMovieObj(LOCAL_QUERY_OBJ, url);

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {

            let listNodes = generateListHTML(json);
            for (let item of listNodes) {
                document.getElementById("result_list").appendChild(item);
            }

            addNextButton(movieList);
        })
        .catch(err => {
            console.log("ERROR:", err.toString())
        });
}

/**
 * @returns array of HTML li nodes
 * 
 * @param {json object} json 
 */
function generateListHTML(json) {
    let listNodes = [];
    for (let i = 0; i < json["Search"].length; i++) {

        let idPrefix = Math.round(Math.random()*1000);
        let listElement = document.createElement("li");
        listElement.classList.add("a-items");
        
        let inputRadio = document.createElement("input");
        let type = document.createAttribute("type");
        type.value = "radio";
        inputRadio.setAttributeNode(type);
        let name = document.createAttribute("name");
        name.value = "ac";
        inputRadio.setAttributeNode(name);
        let id = document.createAttribute("id");
        id.value = `a${idPrefix}${i + 1}`;
        inputRadio.setAttributeNode(id);
        listElement.appendChild(inputRadio);
        
        let label = document.createElement("label");
        label.addEventListener('click', getMovieDetails);
        let forAttr = document.createAttribute("for");
        forAttr.value = `a${idPrefix}${i + 1}`;
        label.setAttributeNode(forAttr);

        label.innerText = json["Search"][i]["Title"];
        listElement.appendChild(label);

        listNodes.push(listElement);
    }

    return listNodes;
}

/**
 * @returns HTML node
 * 
 * @param {json object} json 
 */
function generateDetailsHTML(json) {
    let resultNode = document.createElement('div');
    // let titleH3 = document.createElement('h3');
    let yearP = document.createElement('p');
    yearP.classList.add('details_year');
    let plotP = document.createElement('p');
    plotP.classList.add('details_plot');
    let posterIMG = document.createElement('img');
    resultNode.classList.add("details_container");
    resultNode.classList.add("a-content");
    // titleH3.innerText = json['Title'];
    yearP.innerText = 'Year: ' + json['Year'];
    plotP.innerText = json['Plot'];
    posterIMG.src = json['Poster'];
    // resultNode.appendChild(titleH3);
    resultNode.appendChild(plotP);
    resultNode.appendChild(posterIMG);
    resultNode.appendChild(yearP);

    return resultNode;
}

//Save json object to Local Storage
function saveMovieObj(key, json) {

    window.localStorage.setItem(key, JSON.stringify(json));
}

//return json object from Local Storage
function retrieveMovieObj(key) {

    return JSON.parse(window.localStorage.getItem(key));
}

//return if movie list saved to local storage
function isMovieObjExist(key) {

    return !!(window.localStorage.getItem(key));
}


function getMovieDetails(e) {
    // console.log("Clicked: " + e.target);
    if (e.target.parentElement.childNodes.length > 2) {
        return;
    }
    let url = API_URL; //domain from action of form
    url += "?apikey=";
    url += API_KEY;             //API key
    url += "&t=";
    url += e.target.innerText.trim();// title for search 
    url += "&type=";
    url += typeField.value.trim();  // type

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {

            if (json['Response'] == 'True') {
            e.target.parentElement.appendChild(generateDetailsHTML(json));
            }  

        })
        .catch(err => {
            console.log("ERROR:", err.toString())
        });

}
