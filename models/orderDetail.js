const db = require('../config/db');
const Sequelize = db.sequelize;
const OrderDetail = Sequelize.import('../schema/tb_orderdetail.js')

OrderDetail.sync({ force: false })

class OrderDetailModel {

  // 创建订单详情项
  static async createOrderDetail (data) {
    const { orderDetailId, orderId, goodsId, goodsCount } = data
    return await OrderDetail.findOrCreate({
      where: {
        orderdetail_id: orderDetailId
      },
      defaults: {
        orderdetail_id: orderDetailId,
        order_id: orderId,
        goods_id: goodsId,
        goods_count: goodsCount,
      }
    })
  }

  // 通过订单编号获取订单详情
  static async getOrderDetailByOrderId (orderId) {
    return OrderDetail.findAll({
      where: {
        order_id: orderId
      }
    })
  }
}

module.exports = OrderDetailModel
