const express = require('express');

const productsController = require('../controllers/productsControllers');
const salesController = require('../controllers/salesControllers');
// const validateProduct = require('../middlewares/productsMiddleware');

const router = express.Router();

// products
router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getSingle);
router.post('/products', productsController.create);
router.put('/products/:id', productsController.edit);
router.delete('/products/:id', productsController.deleteProduct);

// sales
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getSaleProductsById);
router.post('/sales', salesController.create);
router.put('/sales/:id', salesController.edit);
// router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;