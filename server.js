const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// import environmental variables
require('dotenv').config({ path: 'variables.env' });

const app = express();
app.use(bodyParser.json());

// handle routes
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
