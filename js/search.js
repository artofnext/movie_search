//const API_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
const API_URL = "https://old.bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

fetch(API_URL)
  .then(response => {
    console.log("RESPONSE:", response);

    return response.json();
  })
  .then(data => {
    console.log(data);
    document.write("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
  })
  .catch(err => {
    console.log("ERROR:", err.toString())
  });
  