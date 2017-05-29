/**
 * Created by Chris Rogers on 5/29/2017.
 */
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


// Get Api Routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set Api Routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 *  Create HTTP Server
 */

const server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
