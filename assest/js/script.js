const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
// Loris edge cases 
// --Box that changes colors for UVI
// --Weather icons (font awesome)
// --Date format (tricky) Search how to find current date. Set and add one "++". moments? append to right place.
//--does search history stay between refreshes 

function displayCurrent(current) {
  // add a text content to textcontent()
  const currentWeather = $("#today");

  // replace current weather with searchTerm
  const currentCity = document.querySelector('#searchTerm').value;
  document.getElementById("form-today").innerHTML = currentCity;
  console.log(currentCity);
  console.log($("#form-today"));
  console.log($("#today"));
  console.log(current);
  // template lit -Lori Look up. Added in vars easy. Just look up to def. Already using them 👀
  temp.append(` ${current.temp}`);
  wind.append(` ${current.wind_speed}`);
  humidity.append(` ${current.humidity}`);
  uv.append(` ${current.uvi}`);
  document.getElementById(temp).innerHTML = "";

  // org code its populating to the top of the page
  // currentWeather.append(` Wind ${current.wind_speed}`);
  // currentWeather.append(`<p>Humidity ${current.humidity}<p>`);
  // UV Index need to add class to make the box change colors 🚫
  // currentWeather.append(`<p>UV Index: ${current.uvi}<p>`);
}

function displayFiveDay(daily) {
  console.log(daily);
  // Ex on CL for this section append. JQ get ID and then append things
  // refactor to for loop 🚫
  console.log(daily[0].temp);
  const fiveDayWeather = $("#forecast");
 // Day 1
  fiveDayWeather.append(`<p>Temp ${daily[0].temp.day}<p>`);
  fiveDayWeather.append(`<p>Wind ${daily[0].wind_speed}<p>`);
  fiveDayWeather.append(`<p>Humidity ${daily[0].humidity}<p>`);
  // Day 2
  fiveDayWeather.append(`<p>Temp ${daily[1].temp.day}<p>`);
  fiveDayWeather.append(`<p>Wind ${daily[1].wind_speed}<p>`);
  fiveDayWeather.append(`<p>Humidity ${daily[1].humidity}<p>`);
  // Day 3
  fiveDayWeather.append(`<p>Temp ${daily[2].temp.day}<p>`);
  fiveDayWeather.append(`<p>Wind ${daily[2].wind_speed}<p>`);
  fiveDayWeather.append(`<p>Humidity ${daily[2].humidity}<p>`);
  // Day 4
   fiveDayWeather.append(`<p>Temp ${daily[3].temp.day}<p>`);
    fiveDayWeather.append(`<p>Wind ${daily[3].wind_speed}<p>`);
    fiveDayWeather.append(`<p>Humidity ${daily[3].humidity}<p>`);

  // Day 5
   fiveDayWeather.append(`<p>Temp ${daily[4].temp.day}<p>`);
   fiveDayWeather.append(`<p>Wind ${daily[4].wind_speed}<p>`);
   fiveDayWeather.append(`<p>Humidity ${daily[4].humidity}<p>`);

}


function saveToLocalState(city) {
  console.log(city);
  const history = $("#history");
  history.append(`<p>${city}<p>`);

}

// Have bill go over
function searchCityWeather() {
  const city = document.querySelector('#searchTerm').value;
  // fetch and getting a long string 
  console.log(`${weatherApiRootUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`);
  fetch(`${weatherApiRootUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`)
  // getting the info back from the API and telling the site what to do
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  //rtn'ing search results 
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
  // 5 day forecast
  .then(function (bodyResponse) {
    console.log(bodyResponse)
    const current = bodyResponse.current;
    const daily = bodyResponse.daily;
    displayCurrent(current);
    displayFiveDay(daily);
    saveToLocalState(city);
  })
  .catch(function (error) {
    console.log(error)
  });
}