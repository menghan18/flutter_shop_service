const db = require('../config/db');
const Sequelize = db.sequelize;
const Order = Sequelize.import('../schema/tb_order.js')

Order.sync({ force: false })

class OrderModel {

  // 通过用户id获取用户所有订单
  static async getOrderByUserId (userId) {
    return await Order.findAll({
      where: {
        user_id: userId
      },
      order: [['create_time', 'DESC']]
    })
  }

  // 通过用户id和订单状态分类获取订单
  static async getOrderByUserIdAndOrderStatus (userId, orderStatus) {
    return await Order.findAll({
      where: {
        user_id: userId,
        order_status: orderStatus
      },
      order: [['create_time', 'DESC']]
    })
  }

  // 创建订单
  static async createOrder (data) {
    const { userId, orderId, orderPrice, addressId } = data
    return await Order.findOrCreate({
      where: {
        order_id: orderId
      },
      defaults: {
        order_id: orderId,
        user_id: userId,
        address_id: addressId,
        order_price: orderPrice,
      }
    })
  }

  // 修改订单状态
  static async updateOrderStatus (orderId, orderStatus) {
    return await Order.update({
      order_status: orderStatus
    },
      {
        where: {
          order_id: orderId
        }
      })
  }

  // 通过地址编号查询订单
  static async getOrderByAddressId (addressId) {
    return await Order.findAll({
      where: {
        address_id: addressId
      },
      order: [['create_time', 'DESC']]
    })
  }
}

module.exports = OrderModel