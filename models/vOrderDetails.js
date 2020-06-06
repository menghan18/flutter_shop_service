const db = require('../config/db');
const Sequelize = db.sequelize;
const VOrderDetails = Sequelize.import('../schema/v_orderdetails.js')

VOrderDetails.sync({ force: false })

class VOrderDetailsModel {
  static async getOrderDetailsByOrderId (orderId) {
    return await VOrderDetails.findAll({
      attributes: { exclude: ['id'] },
      // attributes: ['orderdetail_id', 'goods_id', 'goods_image', 'goods_count', 'goods_price'],
      where: {
        order_id: orderId
      }
    })
  }
}

module.exports = VOrderDetailsModel