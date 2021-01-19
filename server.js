'use strict';

const express = require('express');

const cors = require('cors');

require('dotenv').config();

let app = express();
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
