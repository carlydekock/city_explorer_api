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

  response.send(newLocation);

});

//normalize data with constructor


// ==== Helper Functions ====
function Location(search_query, formatted_query, latitude, longitude){
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

// ==== Start the server ====
app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
