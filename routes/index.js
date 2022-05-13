const productsController = require('../controllers/productsController');
const router = require('express').Router();

router.get('/products', productsController.getAll);

module.exports = router;