const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

// products
router.get('/products', productsController.getAll);
router.post('/products', productsController.create);
router.put('/products/:id', productsController.edit);

// sales

module.exports = router;