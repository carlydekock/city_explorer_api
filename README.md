# Lab 9 - City Explorer API

**Author**: Carly Dekock

**Version**: 1.2.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

Beginning to build an API server for the City Explorer Application. This will allow a user to search for a location, be presented with a map and some interesting information about the area they've selected. There are fully functionining APIs for location information, weather, and nearby parks. There is also a database to store previously searched locations. Today, we added movies as well as yelp information for restaurants showing 5 results at a time.

## Getting Started

### What you need
- Get API keys:
  - LocationIQ
  - Weatherbit
  - National Parks Service
  - The Movie Database API (TMDb)
  - Yelp
- Generate .env with variables of:
  - PORT
  - GEOCODE_API_KEY
  - WEATHER_API_KEY
  - PARKS_API_KEY
  - MOVIE_API_KEY
  - YELP_API_KEY
- Get a connection for database URL
- Install node modules: express, cors, dotenv, superagent, pg
- Set up PORT

### Steps to take
- In Terminal:
  - ```touch server.js``` to create server file
  - ```npm init```
  - ```npm install -S cors dotenv superagent pg``` to install cors, dotenv, superagent, pg libraries
  - ```touch .env``` to create environment file
- Open up server in VS code or another code editor. Put all necessary API keys in .env file as well as PORT info and database info.
- Open up server.js file
- Load any packages first, declare variables for all packages needed
- Configure app
  - ```const app = express();```
  - ```app.use(cors());```
- Set global variables
  - ```const PORT = process.env.PORT```
- Routes
  - ```/location => {}```
  - ```/weather => [{}, {}]```
  - ```/parks => [{}, {}]```
- Route callbacks
- Helper functions
- Start the app
  - ```app.listen(PORT, () => {console.log('server is listening on Port ${PORT})});```

## Architecture

Languages: HTML, CSS, JavaScript, SQL
Libraries: jQuery, Mustache, express, cors, dotenv, superagent, pg

## Time Estimates

- Number and name of feature: To-do #1 - Movies
- Estimate of time needed to complete: 1 hour
- Start time: 4:00pm
- Finish time: 5:15pm
- Actual time needed to complete: 1 hour 15 minutes

- Number and name of feature: To-do #2 - Yelp
- Estimate of time needed to complete: 1 hour
- Start time: 5:30pm
- Finish time: 6:45pm
- Actual time needed to complete: 1 hour 15 minutes

- Number and name of feature: To-do #3 - Pagination
- Estimate of time needed to complete: 30 min
- Start time: 6:45pm
- Finish time: 7:30pm
- Actual time needed to complete: 45 minutes

## Change Log

- 01-18-2021 5:45pm - Application files set up, basic express server deployed to Heroku
- 01-18-2021 8:15pm - Application has fully-functional GET route for the location resource
- 01-18-2021 9:30pm - Application has fully-functional GET route for the weather resource
- 01-18-2021 9:40pm - Application has status of 500 error message displayed to page
- 01-19-2021 4:45pm - Application has .map method implemented for formatted data
- 01-19-2021 5:45pm - Application has api fully-functional for location data
- 01-19-2021 7:00pm - Application has api fully-functional for weather data
- 01-19-2021 8:45pm - Application has api fully-functional for parks data
- 01-20-2021 6:30pm - Application has working database to store location data
- 01-20-2021 7:45pm - Application has ability to search database for previously selected location
- 01-21-2021 5:15pm - Application has api fully-functional for movie data
- 01-21-2021 6:45pm - Application has api fully-functional for yelp restaurant data
- 01-21-2021 7:30pm - Application has pagination fully-functional to display 5 yelp results at a time

## Credits and Collaborations

- Jan 18: Worked at lab table with Jason Q and Dar-Ci
- Jan 18: Jason D helped troubleshoot locations to-do
- Jan 18: Michael Eclavea (TA) helped with weather to-do
- Jan 19: Worked at lab table with Jason Q and Sang
- Jan 19: Jason D helped with rendering all location address data
- Jan 20: Used class demo for guidance in setting up database
- Jan 20: Worked at lab table with Jason Q, Sang, and Dar-Ci
- Jan 21: Worked at lab table with Jason Q, Stephen, and Dar-Ci
- Jan 21: Chance (TA) helped with Yelp API troubleshooting
- Jan 21: Used class demo for guidance in setting up pagination
