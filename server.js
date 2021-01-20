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
  const searchedCity = request.query.search_query;
  // console.log(searchedCity);
  const key = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/current?days=8&city=${searchedCity}&country=US&key=${key}`;
  superagent.get(url).then(result => {
    const weatherData = result.body;
    const arr = weatherData.data.map(jsonObj => {
      const weather = new Weather(
        jsonObj.weather.description,
        jsonObj.valid_date
      );
      return weather;
    });
    response.send(arr);
  })
    .catch(error => {
      response.status(500).send('weatherbit failed');
      console.log(error.message);
    });
});

app.get('/parks', (request, response) => {

  const key = process.env.PARKS_API_KEY;
  const searchedCity = request.query.search_query;
  console.log(searchedCity);
  const url = `https://developer.nps.gov/api/v1/parks?q=${searchedCity}&limit=10&api_key=${key}`;
  superagent.get(url).then(result => {
    const parksData = result.body;
    console.log(parksData.data[0]);
    const parkArray = parksData.data.map(parkObj => {
      const park = new Park(
        parkObj.fullName,
        parkObj.addresses[0].line1,
        parkObj.entranceFees.cost,
        parkObj.description,
        parkObj.url
      );
      return park;
    });
    response.send(parkArray);
  })
    .catch(error => {
      response.status(500).send('parksapi failed');
      console.log(error.message);
    });
});


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

function Park(name, address, fee, description, url) {
  this.name = name;
  this.address = address;
  this.fee = fee;
  this.description = description;
  this.url = url;
}

// ==== Start the server ====
app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
