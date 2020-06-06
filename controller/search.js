const Goods = require('../models/goods')

class SearchController {
  static async getGoodsBySearch (ctx, next) {
    try {
      const searchWord = ctx.query.searchWord
      const data = await Goods.getGoodsBySearch(searchWord)
      // console.log(data)
      ctx.response.status = 200;
      ctx.body = {
        code: 0,
        msg: '查询成功',
        data
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

module.exports = SearchController