const SwiperModel = require('../models/slides')
const FloorModel = require('../models/floor')
const FloorInfoModel = require('../models/floorInfo')
const CategoryModel = require('../models/category')
const GoodsModel = require('../models/goods')

// 首页数据控制器
class IndexController {
  static async getIndex (ctx, next) {
    try {
      const [swipers, floor, floorInfo, category, recommend, hotGoods] = await Promise.all([SwiperModel.getSlides(), FloorModel.getFloor(), FloorInfoModel.getFloorInfo(), CategoryModel.getCategory(), GoodsModel.getRecommendGoods(), GoodsModel.getHotGoods()])
      let floorName = {}
      floor.forEach((item) => {
        floorName[`floor${item.floor_id}`] = item.floor_name
      })
      let floorOne = floorInfo.slice(0, 5), floorTwo = floorInfo.slice(5, 10), floorThree = floorInfo.slice(10)
      ctx.body = {
        code: 0,
        msg: '查询成功',
        data: {
          swipers,
          floorName,
          floorOne,
          floorTwo,
          floorThree,
          category,
          recommend,
          hotGoods
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message,
        data: null
      }
    }


    // recommend.forEach(item => {
    //   item.goods_price = item.goods_price.toFixed(2)
    // })
    // console.log(recommend)
    ctx.response.status = 200;


    await next()
  }
}

module.exports = IndexController