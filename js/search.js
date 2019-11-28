
const API_URL = "http://www.omdbapi.com/?apikey=b336e268&t=trek";
const API_URL_IMG = "http://img.omdbapi.com/?apikey=[yourkey]&";
const API_KEY = "b336e268";

let searchField = document.getElementById('search');
let typeField = document.getElementById('type');
let searchButton = document.getElementById('search_button');
let searchForm = document.getElementById('movie_search');
// searchButton.addEventListener('click', doRequest);
let xhr = new XMLHttpRequest();

searchForm.onsubmit = function(e) {

	e.preventDefault();
	
	let f = e.target,
        formData = new FormData(f);
        
    formData.append('apikey', API_KEY);

	xhr.open("GET", f.action);
	xhr.send(formData);
}

xhr.onreadystatechange = function() {
  
    if (this.readyState == 4 && this.status == 200) {
      movieObj = JSON.parse(this.responseText);

      console.log(movieObj);
    }
    console.log("Bad responce!");
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
