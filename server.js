'use strict';

// ==== packages ====
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent'); //this is for getting data from a url

// ==== setup the application (server) ====
const app = express(); // creates a server from the express library
app.use(cors()); // app.use loads middleware - we are loading cors so that requests don't get blocked when they are local

// ==== other global variables ====
const PORT = process.env.PORT || 3111;

// ==== Routes ====
app.get('/', (request, response) => {
  response.send('you made it home');
});

app.get('/location', (request, response) => {
  if (request.query.city === '') {
    response.status(500).send('Error, pick a city to explore');
    return;
  }

  const searchedCity = request.query.city;
  const key = process.env.GEOCODE_API_KEY;

  // const theDataArrayFromLocationJson = require('./data/location.json');
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${searchedCity}&format=json`;
  superagent.get(url).then(result => {
    const theDataObjFromJson = result.body[0];
    const newLocation = new Location(
      searchedCity,
      theDataObjFromJson.display_name,
      theDataObjFromJson.lat,
      theDataObjFromJson.lon
    );
    response.send(newLocation);
  })
    .catch(error => {
      response.status(500).send('locationiq failed');
      console.log(error.message);
    });
});

app.get('/weather', (request, response) => {
  const weatherData = require('./data/weather.json');
  const arr = weatherData.data.map(jsonObj => {
    const weather = new Weather(
      jsonObj.weather.description,
      jsonObj.valid_date
    );
    return weather;
  });
  response.send(arr);
});
//normalize data with constructor


// ==== Helper Functions ====
function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = time;
}

// ==== Start the server ====
app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
