const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
// Loris edge cases 
// --Weather icons (font awesome)
// --Date format (tricky) Search how to find current date. Set and add one "++". moments? append to right place.
// DT date in "" convert to date. use moment.  See cdm link 
//--does search history stay between refreshes 

function displayCurrent(current) {
  // add a text content to textcontent() 🚫
  const currentWeather = $("#today");
  currentWeather.empty ();
  console.log(currentWeather);
  console.log(current);

  // replace current weather with searchTerm
  const currentCity = document.querySelector('#searchTerm').value;
  currentWeather.append(` <h2 id="form-today" class ="card-header">${currentCity} <span>${moment.unix(current.dt).format("MM/DD/YYYY")} </span> </h2> `);
  // document.getElementById("form-today").innerHTML = currentCity;
  // console.log(currentCity);
  // console.log($("#form-today"));
  // console.log($("#today"));
  // console.log(current);
  // template lit -Lori Look up. Added in vars easy. Just look up to def. Already using them 👀
    // org code its populating to the top of the page
  currentWeather.append(` <p>Temp ${current.temp}</p>`);
  currentWeather.append(` <p>Wind ${current.wind_speed}</p>`);
  currentWeather.append(`<p>Humidity ${current.humidity}<p>`);
  // UV Index need to add class to make the box change colors 
  // currentWeather.append(`<p>UV Index: ${current.uvi}<p>`);
  if (current.uvi < 3) {
    currentWeather.append(`<p>UV Index: <span class="green"> ${current.uvi} </span></p>`);
  } else if (current.uvi < 6) {
    currentWeather.append(`<p>UV Index: <span class="yellow"> ${current.uvi} </span></p>`);
  } else if (current.uvi < 8) {
    currentWeather.append(`<p>UV Index: <span class="orange"> ${current.uvi} </span></p>`);
  } else if (current.uvi < 11) {
    currentWeather.append(`<p>UV Index: <span class="red"> ${current.uvi} </span></p>`);
  } else {
    currentWeather.append(`<p>UV Index: <span class="purple"> ${current.uvi} </span></p>`);
  };
  
  // old
  // temp.append(` ${current.temp}`);
  // wind.append(` ${current.wind_speed}`);
  // humidity.append(` ${current.humidity}`);
  // uv.append(` ${current.uvi}`);



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

function searchCityWeather() {
  const city = document.querySelector('#searchTerm').value;
  console.log(city);
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