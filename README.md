# Lab 8 - City Explorer API

**Author**: Carly Dekock

**Version**: 1.2.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

Beginning to build an API server for the City Explorer Application. This will allow a user to search for a location, be presented with a map and some interesting information about the area they've selected. There are fully functionining APIs for location information, weather, and nearby parks. Today we implemented a database to store previously searched locations.

## Getting Started
1. In Terminal:
  - ```touch server.js``` to create server file
  - ```npm init```
  - ```npm install -S cors dotenv superagent pg``` to install cors, dotenv, superagent, pg libraries
  - ```touch .env``` to create environment file
1. Open up server in VS code or another code editor. Put all necessary API keys in .env file as well as PORT info and database info.
1. Open up server.js file
1. Load any packages first, declare variables for all packages needed
1. Configure app
  - ```const app = express();```
  - ```app.use(cors());```
1. Set global variables
  - ```const PORT = process.env.PORT```
1. Routes
  - ```/location => {}```
  - ```/weather => [{}, {}]```
  - ```/parks => [{}, {}]```
1. Route callbacks
1. Helper functions
1. Start the app
  - ```app.listen(PORT, () => {console.log('server is listening on Port ${PORT})});```

## Architecture

Languages: HTML, CSS, JavaScript, SQL
Libraries: jQuery, Mustache, express, cors, dotenv, superagent, pg

## Time Estimates

- Number and name of feature: To-do #1 - Database
- Estimate of time needed to complete: 30 min
- Start time: 5:45 pm
- Finish time: 6:30 pm
- Actual time needed to complete: 45 minutes

- Number and name of feature: To-do #2 - Server
- Estimate of time needed to complete: 1 hour
- Start time: 6:30 pm
- Finish time: 7:45 pm
- Actual time needed to complete: 1 hour 15 minutes

- Number and name of feature: To-do #3 - Deploy
- Estimate of time needed to complete: 30 min
- Start time: 7:45 pm
- Finish time: 8:15 pm
- Actual time needed to complete: 30 minutes

- Number and name of feature: To-do #4 - Stretch Goal: Server
- Estimate of time needed to complete: 30 min
- Start time:
- Finish time:
- Actual time needed to complete: Already completed in step 2 it appears.

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

## Credits and Collaborations

- Jan 18: Worked at lab table with Jason Q and Dar-Ci
- Jan 18: Jason D helped troubleshoot locations to-do
- Jan 18: Michael Eclavea (TA) helped with weather to-do
- Jan 19: Worked at lab table with Jason Q and Sang
- Jan 19: Jason D helped with rendering all location address data
- Jan 20: Used class demo for guidance in setting up database
- Jan 20: Worked at lab table with Jason Q, Sang, and Dar-Ci
