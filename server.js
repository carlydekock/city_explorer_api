'use strict';

// ==== packages ====
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent'); //this is for getting data from a url
const pg = require('pg');

// ==== setup the application (server) ====
const app = express(); // creates a server from the express library
app.use(cors()); // app.use loads middleware - we are loading cors so that requests don't get blocked when they are local

const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);

// ==== other global variables ====
const PORT = process.env.PORT || 3111;

// ==== Routes ====
app.get('/', (request, response) => {
  response.send('you made it home');
});

app.get('/location', getGpsInfo);
app.get('/weather', getWeatherInfo);
app.get('/parks', getParksInfo);


// ==== Route callbacks ====

function getGpsInfo(request, response) {
  const searchedCity = request.query.city;
  const key = process.env.GEOCODE_API_KEY;

  //if it is in the db already, use that
  const sqlQuery = 'SELECT * FROM location WHERE search_query=$1';
  const sqlArray = [searchedCity];
  client.query(sqlQuery, sqlArray).then(result => {
    console.log('result.rows', result.rows);

    if (result.rows.length !== 0) {
      response.send(result.rows[0]);
    } else {
      if (request.query.city === '') {
        response.status(500).send('Error, pick a city to explore');
        return;
      }
      const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${searchedCity}&format=json`;
      superagent.get(url).then(result => {
        const locationObject = result.body[0];
        const newLocation = new Location(searchedCity, locationObject);
        //Save location to database
        const sqlQuery = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
        const sqlArray = [newLocation.search_query, newLocation.formatted_query, newLocation.latitude, newLocation.longitude];

        client.query(sqlQuery, sqlArray);

        response.send(newLocation);
      })
        .catch(error => {
          response.status(500).send('locationiq failed');
          console.log(error.message);
        });

    }
  });
}

function getWeatherInfo(request, response) {
  const searchedCity = request.query.search_query;
  const key = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/current?days=8&city=${searchedCity}&country=US&key=${key}`;
  superagent.get(url).then(result => {
    const weatherData = result.body;
    const arr = weatherData.data.map(weatherObj => new Weather(weatherObj));
    response.send(arr);
  })
    .catch(error => {
      response.status(500).send('weatherbit failed');
      console.log(error.message);
    });
}

function getParksInfo(request, response) {
  const key = process.env.PARKS_API_KEY;
  const searchedCity = request.query.search_query;
  const url = `https://developer.nps.gov/api/v1/parks?q=${searchedCity}&limit=10&api_key=${key}`;
  superagent.get(url).then(result => {
    const parksData = result.body;
    const parkArray = parksData.data.map(parkObject => new Park(parkObject));
    response.send(parkArray);
  })
    .catch(error => {
      response.status(500).send('parksapi failed');
      console.log(error.message);
    });
}

// ==== Helper Functions ====
function Location(city, object) {
  this.search_query = city;
  this.formatted_query = object.display_name;
  this.longitude = object.lon;
  this.latitude = object.lat;
}

function Weather(object) {
  this.forecast = object.weather.description;
  this.time = object.valid_date;
}

function Park(object) {
  this.name = object.fullName;
  this.address = `${object.addresses[0].line1} ${object.addresses[0].city}, ${object.addresses[0].stateCode} ${object.addresses[0].postalCode}`;
  this.fee = object.entranceFees.fee;
  this.description = object.description;
  this.url = object.url;
}

// ==== Start the server ====
client.connect();

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
