
const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.get('/users/:id', UserController.get);
routes.post('/users/authenticate', UserController.authenticate);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;