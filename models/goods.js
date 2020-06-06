const db = require('../config/db');
const Sequelize = db.sequelize;
const Goods = Sequelize.import('../schema/tb_goods.js')

Goods.sync({ force: false })

class GoodsModel {
  // 查询推荐商品
  static async getRecommendGoods () {
    return await Goods.findAll({
      attributes: ['goods_id', 'goods_name', 'goods_price', 'goods_image'],
      where: {
        is_recommend: 1
      }
    })
  }

  // 获取火爆商品
  static async getHotGoods () {
    return await Goods.findAll({
      attributes: ['goods_id', 'goods_name', 'goods_price', 'goods_image'],
      where: {
        sales: {
          $gt: 0
        }
      },
      order: [['sales', 'DESC']]
    })
  }

  // 获取商品详情
  static async getGoodsDetailById (goodsId) {
    return await Goods.findOne({
      attributes: ['goods_id', 'goods_name', 'goods_price', 'goods_image', 'goods_detail'],
      where: {
        goods_id: goodsId
      }
    })
  }

  // 根据关键字搜索商品
  static async getGoodsBySearch (searchWord) {
    return await Goods.findAll({
      attributes: ['goods_id', 'goods_name', 'goods_price', 'goods_image'],
      where: {
        goods_name: {
          $like: `%${searchWord}%`
        }
      }
    })
  }

  // 修改商品数量
  static async updateGoodsCountAndSales (goodsId, count) {
    // 数量减，销量加
    return await Goods.update({
      goods_amount: Sequelize.literal(`goods_amount-${count}`),
      sales: Sequelize.literal(`sales+${count}`)
    },
      {
        where: {
          goods_id: goodsId
        }
      })
  }

  // 取消修改商品数量
  static async cancelUpdateGoodsCountAndSales (goodsId, count) {
    // 数量加，销量减
    return await Goods.update({
      goods_amount: Sequelize.literal(`goods_amount+${count}`),
      sales: Sequelize.literal(`sales-${count}`)
    },
      {
        where: {
          goods_id: goodsId
        }
      })
  }
}

module.exports = GoodsModel