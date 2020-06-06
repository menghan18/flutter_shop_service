const db = require('../config/db');
const Sequelize = db.sequelize;
const Category = Sequelize.import('../schema/tb_category.js')

Category.sync({ force: false })

class CategoryModel {
  static async getCategory () {
    return await Category.findAll({
      order: [
        ['category_id', 'ASC']
      ]
    })
  }
}

module.exports = CategoryModel