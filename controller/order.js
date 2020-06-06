const OrderModel = require('../models/order')
const OrderDetailModel = require('../models/orderDetail')
const AddressModel = require('../models/address')
const GoodsModel = require('../models/goods')
const VOrderDetailsModel = require('../models/vOrderDetails')
const { verifyToken } = require('../config/token')
const { genOrderId } = require('../config/utils')
const uuid = require('../config/uuid')

class OrderController {

  // static async getOrderDetailsByOrderId(ctx) {
  //   try{

  //   }
  // }

  // 获取用户订单
  static async getUserOrder (ctx) {
    try {
      const { token, status } = ctx.request.body
      if (!token) throw new Error("缺少token")
      if (!status && status != 0) throw new Error("缺少status")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (!userId) throw new Error(verify)
      let orderList
      if (status != 0) {
        orderList = await OrderModel.getOrderByUserIdAndOrderStatus(userId, status)
      } else {
        orderList = await OrderModel.getOrderByUserId(userId)
      }

      const data = []
      for (let order of orderList) {
        const { order_id, order_price, order_status, create_time, update_time, address_id } = order
        const orderInfo = { order_id, order_price, order_status, create_time, update_time }
        const orderDetailList = await VOrderDetailsModel.getOrderDetailsByOrderId(order_id)
        if (orderDetailList.length == 0) throw new Error("获取订单详细失败")
        // const addressInfo = await AddressModel.getAddressByAddressId(address_id)
        const { recipent, phone, address } = orderDetailList[0]
        orderInfo.addressInfo = { address_id, recipent, phone, address }
        orderInfo.orderDetails = []
        for (let orderDetail of orderDetailList) {
          const { orderdetail_id, goods_id, goods_name, goods_image, goods_count, goods_price } = orderDetail
          orderInfo.orderDetails.push({ orderdetail_id, goods_id, goods_name, goods_image, goods_count, goods_price })
        }
        // orderInfo.orderDetails = orderDetailList
        data.push(orderInfo)
      }
      ctx.body = {
        code: 0,
        msg: "获取用户订单成功",
        data
      }
    } catch (e) {
      console.log(e)
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }

  // 创建订单
  static async createOrder (ctx) {
    try {
      const { token, orderInfo } = ctx.request.body
      if (!token) throw new Error("缺少token")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (!userId) throw new Error(verify)
      const orderId = genOrderId(userId)
      const { orderDetailList, addressId, orderPrice } = orderInfo
      const { user_id: addressUserId } = await AddressModel.getAddressByAddressId(addressId)
      if (userId != addressUserId) throw new Error('地址与用户信息不匹配')
      // 查询比较商品数量是否足够
      for (let orderDetail of orderDetailList) {
        const { goodsId, goodsCount } = orderDetail
        const { goods_name, goods_amount: count } = await GoodsModel.getGoodsDetailById(goodsId)
        if (goodsCount > count) throw new Error(`商品${goods_name}数量不足`)
      }
      // 订单数据
      const orderData = {
        orderId, userId, addressId, orderPrice
      }
      const createOrderRes = await OrderModel.createOrder(orderData)
      if (!createOrderRes) throw new Error('创建订单失败')
      // 遍历订单详情列表创建订单详情
      for (let orderDetail of orderDetailList) {
        const { goodsId, goodsCount } = orderDetail
        // const {goodsId}=await GoodsModel.getGoodsDetailById(userId)
        const orderDetailId = uuid()
        const orderDetaildata = { orderDetailId, orderId, goodsId, goodsCount }
        const createOrderDetailRes = await OrderDetailModel.createOrderDetail(orderDetaildata)
        if (!createOrderDetailRes) throw new Error('创建订单详情失败')
      }
      ctx.body = {
        code: 0,
        msg: '创建订单成功',
        data: orderId
      }
      // 商品数量和销量修改
      for (let orderDetail of orderDetailList) {
        const { goodsId, goodsCount } = orderDetail
        const res = await GoodsModel.updateGoodsCountAndSales(goodsId, goodsCount)
        if (!res) throw new Error('修改商品数量失败')
      }
    } catch (e) {
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }

  static async updateOrderStatus (ctx) {
    try {
      const { token, orderId, orderStatus } = ctx.request.body
      if (!token) throw new Error("缺少token")
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (!userId) throw new Error(verify)
      const updateRes = await OrderModel.updateOrderStatus(orderId, orderStatus)
      if (updateRes[0] == 0) throw new Error('修改订单状态失败')
      ctx.body = {
        code: 0,
        msg: "修改订单状态成功",
        data: null
      }

      // 若取消订单需恢复数量
      if (orderStatus == -1) {
        const orderDetailList = await VOrderDetailsModel.getOrderDetailsByOrderId(orderId)
        // 商品数量和销量修改
        for (let orderDetail of orderDetailList) {
          const { goods_id, goods_count } = orderDetail
          const res = await GoodsModel.cancelUpdateGoodsCountAndSales(goods_id, goods_count)
          if (!res) throw new Error('修改商品数量失败')
        }
      }
    } catch (e) {
      console.log(e)
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }
}

module.exports = OrderController