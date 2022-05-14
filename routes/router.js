const express = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = express.Router();
productsRoute.use(express.json());

productsRoute.get('/', productsController.getAll);
productsRoute.post('/', productsController.create);

module.exports = productsRoute;