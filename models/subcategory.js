const db = require('../config/db');
const Sequelize = db.sequelize;
const Subcategory = Sequelize.import('../schema/tb_subcategory.js')

Subcategory.sync({ force: false })

class SubcategoryModel {
  static async getSubcategory () {
    return await Subcategory.findAll({
      order: [
        ['category_id', 'ASC']
      ]
    })
  }
}

module.exports = SubcategoryModel