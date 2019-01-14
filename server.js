const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const compression = require('compression');
const path = require('path'); //

// import environmental variables
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// gzip
app.use(compression());

// serve client
app.use(express.static(path.join(__dirname, 'client/dist')));

// handle routes
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
