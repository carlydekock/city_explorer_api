'use strict';

// ==== packages ====
const express = require('express');

const cors = require('cors');

require('dotenv').config();

// ==== setup the application (server) ====
const app  = express(); // creates a server from the express library
app.use(cors()); // app.use loads middleware - we are loading cors so that requests don't get blocked when they are local

// ==== other global variables ====
const PORT = process.env.PORT || 3111;

// ==== Routes ====
app.get('/', (request, response) => {
  response.send('you made it home');
});

app.get('/location', (request, response) => {
  if(request.query.city === ''){
    response.status(500).send('Error, pick a city to explore');
    return;
  }

  const theDataArrayFromLocationJson = require('./data/location.json');
  const theDataObjFromJson = theDataArrayFromLocationJson[0];
  const searchedCity = request.query.city;
  console.log(request.query);

  const newLocation = new Location(
    searchedCity,
    theDataObjFromJson.display_name,
    theDataObjFromJson.lat,
    theDataObjFromJson.lon
  );
  console.log(newLocation);
  response.send(newLocation);
});

app.get('/weather', (request, response) => {
  const weatherData = require('./data/weather.json');
  // const theDataWeatherObjFromJson = weatherData.data;
  const arr = [];
  weatherData.data.forEach(jsonObj => {
    const weather = new Weather(
      jsonObj.weather.description,
      jsonObj.datetime
    );
    arr.push(weather);
  });
  response.send(arr);
});
//normalize data with constructor


// ==== Helper Functions ====
function Location(search_query, formatted_query, latitude, longitude){
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

function Weather(forecast, time){
  this.forecast = forecast;
  this.time = time;
}

// ==== Start the server ====
app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
