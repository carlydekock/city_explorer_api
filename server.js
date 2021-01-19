'use strict';

const express = require('express');

const cors = require('cors');

require('dotenv').config();

const app  = express();
app.use(cors());

const PORT = process.env.PORT || 3111;

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
