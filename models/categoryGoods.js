const db = require('../config/db');
const Sequelize = db.sequelize;
const CategoryGoods = Sequelize.import('../schema/v_categorygoods.js')

CategoryGoods.sync({ force: false })

class CategoryGoodsModel {
  // 通过二级分类获取商品列表
  static async getGoodsListBySubcategoryId (subcategoryId) {
    return await CategoryGoods.findAll({
      attributes: ['goods_id', 'goods_name', 'goods_price', 'goods_image'],
      where: {
        subcategory_id: subcategoryId
      },
      order: [
        ['goods_price', 'ASC']
      ]
    })
  }

  // 通过一级分类获取商品列表
  static async getGoodsListByCategoryId (categoryId) {
    return await CategoryGoods.findAll({
      attributes: ['goods_id', 'goods_name', 'goods_price', 'goods_image'],
      where: {
        category_id: categoryId
      },
      order: [
        ['goods_price', 'ASC']
      ]
    })
  }
}

module.exports = CategoryGoodsModel