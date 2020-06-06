const db = require('../config/db');
const Sequelize = db.sequelize;
const Slides = Sequelize.import('../schema/tb_slides.js')

Slides.sync({ force: false })

class SlidesModel {
  static async getSlides () {
    return await Slides.findAll({})
  }
}

module.exports = SlidesModel