const db = require('../config/db');
const Sequelize = db.sequelize;
const FloorInfo = Sequelize.import('../schema/tb_floorInfo.js')

FloorInfo.sync({ force: false })

class FloorInfoModel {
  static async getFloorInfo () {
    return await FloorInfo.findAll({
      attributes: ['goods_id', 'goods_name', 'image'],
      order: [
        // id升序，首图降序
        ['floor_id', 'ASC'],
        ['is_first', 'DESC']
      ]
    })
  }
}

module.exports = FloorInfoModel