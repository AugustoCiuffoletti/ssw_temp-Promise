// Import stylesheets
import "./style.css";

const API_KEY = "d0fda39104b3c7c45fe031a5392964c1";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

var cityElems = Array.from(document.getElementsByClassName("città"));
var t = 0;
for (let elem of cityElems) {
  elem.onclick = () => display(elem.innerHTML);
}
calcoloMedia.onclick = () => media();
// Promette i risultati di un callback applicato ai dati di una citta'
async function doCity(city, callback) {
  let response = await fetch(API_URL + "&q=" + city);
  if (response.ok) {
    let json = await response.json();
    return callback(json);
  } else {
    alert("Errore: " + response.status);
  }
}
// Visualizzazione della temperatura di un a citta'
async function display(city) {
  let t = await doCity(city, data => data.main.temp);
  document.getElementById("risposta").innerHTML =
      "A " + city + " ci sono " + t + " gradi";
}
// Promette la temperatua di una città
async function fetchTempForCity(cityElem) {
  return await doCity(cityElem.innerHTML, data => data.main.temp);
}
// Promette la media delle temperature
async function media() {
  let media = 0;
  let temps = await Promise.all(cityElems.map(fetchTempForCity));
  media = temps.reduce((media, data) => data + media) / temps.length;
  document.getElementById("media").innerHTML =
    "La temperatura media e' di " + media + " gradi";
}
