const express = require('express');

const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const router = express.Router();

// products
router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.edit);
router.post('/products', productsController.create);
router.put('/products/:id', productsController.edit);
router.delete('/products/:id', productsController.deleteProduct);

// sales
// router.get('/sales', salesController.getAll);
router.post('/sales', salesController.create);
router.put('/sales/:id', salesController.edit);
router.get('/sales/:id', salesController.getSaleProductsById);
// router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;