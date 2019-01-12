const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const compression = require('compression');
const path = require('path'); //

// import environmental variables
// require('dotenv').config({ path: 'variables.env' }); //

const app = express();
app.use(bodyParser.json());

// gzip
app.use(compression());

// serve client
app.use(express.static(path.join(__dirname, 'client/dist')));

// handle routes
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
