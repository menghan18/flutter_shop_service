const db = require('../config/db');
const Sequelize = db.sequelize;
const Floor = Sequelize.import('../schema/tb_floor.js')

Floor.sync({ force: false })

class FloorModel {
  static async getFloor () {
    return await Floor.findAll({
      attributes: ['floor_id', 'floor_name']
    })
  }
}

module.exports = FloorModel