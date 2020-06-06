const Goods = require('../models/goods')

class GoodsController {
  static async getGoodsDetailById (ctx, next) {
    try {
      const goodsId = ctx.query.goodsId
      if (!goodsId) throw new Error('缺少goodsId')
      const goodsInfo = await Goods.getGoodsDetailById(goodsId)
      if (goodsInfo) {
        ctx.body = {
          code: 0,
          msg: '查询成功',
          data: {
            goodsInfo
          }
        }
      } else {
        throw new Error('查无此商品')
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message,
        data: null
      }
    }


    await next()
  }
}

module.exports = GoodsController