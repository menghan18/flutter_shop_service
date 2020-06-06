const Router = require('koa-router')
const router = new Router();
const GoodsController = require('./controller/goods')
const IndexController = require('./controller/index')
const CategoryController = require('./controller/category')
const SearchController = require('./controller/search')
const UserController = require('./controller/user')
const AddressController = require('./controller/address')
const OrderController = require('./controller/order')

router
  .get('/getIndex', IndexController.getIndex)
  .get('/getGoodsDetailById', GoodsController.getGoodsDetailById)
  .get('/getAllCategoryInfo', CategoryController.getAllCategoryInfo)
  .get('/getGoodsListByCategoryId', CategoryController.getGoodsListByCategoryId)
  .get('/searchGoods', SearchController.getGoodsBySearch)
  .post('/signin', UserController.signin)
  .post('/login', UserController.login)
  .post('/updateUserInfo', UserController.updateUserInfo)
  .post('/createOrder', OrderController.createOrder)
  .post('/updateOrderStatus', OrderController.updateOrderStatus)
  .post('/getUserOrder', OrderController.getUserOrder)
  .post('/getAddress', AddressController.getAddress)
  .post('/createAddress', AddressController.createAddress)
  .post('/deleteAddress', AddressController.deleteAddress)
  .post('/updateAddress', AddressController.updateAddress)
  .post('/getDefaultAddress', AddressController.getDefaultAddress)


module.exports = router
