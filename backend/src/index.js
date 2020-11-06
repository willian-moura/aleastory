const express = require('express');
const routes = require('./routes');
// const cors = require('cors');
const app = express();
const http = require('http')
const gameModule = require('./controllers/GameController.js')

// app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app)

gameModule(server)

const port = 3333
server.listen(port);
console.log(`Listen on ${port} port...`)