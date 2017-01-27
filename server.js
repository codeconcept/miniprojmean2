const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./server/routes/api');
const app = express();

// POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

// API route
app.use('/api', api);
// catch all
app.get('*', (req, res) => {
    //!\ need to ng build to generate a dist folder
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.port || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on port ${port}`));