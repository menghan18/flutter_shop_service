const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const CategoryGoods = require('../models/categoryGoods')

class CategoryController {
  // 获取一级二级分类信息
  static async getAllCategoryInfo (ctx) {
    try {
      const [categoryData, subcategoryData] = await Promise.all([Category.getCategory(), Subcategory.getSubcategory()])
      let data = []
      categoryData.forEach(item => {
        const obj = {
          categoryId: item.category_id,
          categoryName: item.category_name,
          subcategory: []
        }
        data.push(obj)
      })
      subcategoryData.forEach(item => {
        data[item.category_id - 1].subcategory.push(item)
      })
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
  }

  // 通过分类id获取商品列表
  static async getGoodsListByCategoryId (ctx) {
    try {
      const subcategoryId = ctx.query.subcategoryId || 0
      const categoryId = ctx.query.categoryId || 0
      let data = []
      if (subcategoryId != 0) {
        data = await CategoryGoods.getGoodsListBySubcategoryId(subcategoryId)
      } else {
        data = await CategoryGoods.getGoodsListByCategoryId(categoryId)
      }
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
  }
}

module.exports = CategoryController