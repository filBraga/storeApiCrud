const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

// products
router.get('/products', productsController.getAll);
router.post('/products', productsController.create);

// sales

module.exports = router;