const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

function displayCurrent(current) {
//Use jQuery to add to here:
// <section
   //           id="today"
     //       ></section>
// loris PSC
//     -Create 
//     -create UL elements to make up todays weather list temp/wind/humd/UV
//     -append to #today-weather-info ul 
//     -get info for #searchTerm and append it to #today
}

function displayFiveDay(daily) {
//Use jQuery to add to here:
// <section
   //           id="forecast"
     //       ></section>
}

// have bill go over
function saveToLocalState(city) {

}

// Have bill go over
function searchCityWeather() {
  const city = document.querySelector('#searchTerm').value;
  fetch(`${weatherApiRootUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`)
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log('body', body);
    const lat = body[0].lat;
    const lon = body[0].lon;
    console.log(lat, lon);
    return fetch(`${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`)
  })
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body)
    const current = body.current;
    const daily = body.daily;
    displayCurrent(current);
    displayFiveDay(daily);
    saveToLocalState(city);
  })
  .catch(function (error) {
    console.log(error)
  });
}