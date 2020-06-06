const db = require('../config/db');
const Sequelize = db.sequelize;
const UserInfo = Sequelize.import('../schema/tb_userinfo.js')

UserInfo.sync({ force: false })

class UserInfoModel {

  static async createUserInfo (data) {
    const { userName, userId } = data
    return UserInfo.findOrCreate({
      where: {
        user_id: userId
      },
      defaults: {
        user_name: userName
      }
    })
  }

  static async getUserInfoById (id) {
    return await UserInfo.findOne({
      where: {
        user_id: id
      }
    })
  }

  // 修改用户性别
  static async updateUserSex (userId, sex) {
    return await UserInfo.update({
      sex
    },
      {
        where: {
          user_id: userId
        }
      })
  }
}

module.exports = UserInfoModel