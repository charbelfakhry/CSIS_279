var express = require('express')
var router = express.Router()

var ControllerRoute = require('../controller/controller');
var ProductController = require('../controller/productController');
var OrderController = require('../controller/OrdersController');

/**
 * User Routes
 */
router.post('/updateUser', ControllerRoute.updateUser)
router.post('/insertUser', ControllerRoute.insertUser)
router.post('/deleteUser', ControllerRoute.deleteUser)
router.get('/getAllUsers', ControllerRoute.getAll)

/**
 * Products Routes
 */
router.post('/updateProduct', ProductController.updateProduct);
router.post('/insertProduct', ProductController.insertProduct);
router.post('/deleteProduct', ProductController.deleteProduct);

/**
 * Orders Routes
 */

router.get('/loadOrders', OrderController.getOrderWithAssData);







module.exports = router