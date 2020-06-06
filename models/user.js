const db = require('../config/db');
const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/tb_user.js')

User.sync({ force: false })

class UserModel {
  // 创建用户
  static async createUser (data) {
    const { userName, password } = data
    return User.findOrCreate({
      where: {
        user_name: userName
      },
      defaults: {
        password: password,
        role: 2,
      }
    })
    // const result = await User.findOne({
    //   where: {
    //     user_name: userName
    //   }
    // })

    // if (!result) {
    //   await User.create({
    //     user_name: userName,
    //     password: password,
    //     role: 2,
    //   })
    //   return true
    // } else {
    //   return false
    // }
  }

  // 通过用户名获取用户信息
  static async getUserByUserName (userName) {
    return await User.findOne({
      where: {
        user_name: userName
      }
    })
  }

  // 通过用户名和密码获取用户信息,获取不到则说明密码错误
  // static async getUser (req) {
  //   let { userName, password } = req
  //   return await User.findOne({
  //     where: {
  //       user_name: userName,
  //       password: password
  //     }
  //   })
  // }
}

module.exports = UserModel