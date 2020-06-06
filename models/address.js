const db = require('../config/db');
const Sequelize = db.sequelize;
const Address = Sequelize.import('../schema/tb_address.js')

Address.sync({ force: false })

class AddressModel {
  // 通过用户id获取地址
  static async getAddressByUserId (id) {
    return await Address.findAll({
      where: {
        user_id: id
      }
    })
  }

  // 通过地址id获取地址
  static async getAddressByAddressId (id) {
    return await Address.findOne({
      where: {
        id
      }
    })
  }

  // 创建地址
  static async createAddress (data) {
    const { addressId, userId, address, recipent, phone, isdefault } = data
    return await Address.findOrCreate({
      where: {
        id: addressId
      },
      defaults: {
        id: addressId,
        user_id: userId,
        recipent,
        phone,
        address,
        isdefault
      }
    })
  }

  // 修改地址
  static async updateAddress (data) {
    const { addressId, address, recipent, phone, isdefault } = data
    return await Address.update({
      address,
      recipent,
      phone,
      isdefault
    },
      {
        where: {
          id: addressId
        }
      })
  }

  // 删除地址
  static async deleteAddress (id) {
    return await Address.destroy(
      {
        where: {
          id
        }
      })
  }

  // 获取默认地址
  static async getDefaultAddress (userId) {
    return await Address.findOne({
      where: {
        isdefault: 1,
        user_id: userId
      }
    })
  }

  // 设置默认地址
  static async setDefaultAddress (id) {
    return await Address.update({
      isdefault: 1
    },
      {
        where: {
          id
        }
      })
  }

  // 取消默认地址
  static async cancelDefaultAddress (id) {
    return await Address.update({
      isdefault: 0
    },
      {
        where: {
          id
        }
      })
  }
}

module.exports = AddressModel