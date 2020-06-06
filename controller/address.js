const AddressModel = require('../models/address')
const OrderModel = require('../models/order')
const { verifyToken } = require('../config/token')
const uuid = require('../config/uuid')

class AddressController {
  static async getAddress (ctx) {
    try {
      const { token } = ctx.request.body
      if (!token) throw new Error("缺少token")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (userId) {
        const address = await AddressModel.getAddressByUserId(userId)
        ctx.body = {
          code: 0,
          msg: "获取地址成功",
          data: address
        }
      } else {
        throw new Error(verify)
      }
    } catch (e) {
      console.log(e)
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }

  // 创建地址
  static async createAddress (ctx) {
    try {
      const { token, addressInfo } = ctx.request.body
      if (!token) throw new Error("缺少token")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (!userId) throw new Error(verify)
      const addressId = uuid()
      const { recipent, phone, address, isdefault } = addressInfo
      if (isdefault == 1) {
        const defaultAddress = await AddressModel.getDefaultAddress(userId)
        if (defaultAddress && defaultAddress.id) {
          const cancelDefaultRes = await AddressModel.cancelDefaultAddress(defaultAddress.id)
          if (!cancelDefaultRes[0]) throw new Error('取消默认地址失败')
        }

      }
      const data = { addressId, userId, recipent, phone, address, isdefault }
      const createAddressRes = await AddressModel.createAddress(data)
      if (!createAddressRes) throw new Error("创建地址失败")
      ctx.body = {
        code: 0,
        msg: "创建地址成功",
        data: null
      }

    } catch (e) {
      console.log(e)
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }

  // 删除地址，伪删除
  static async deleteAddress (ctx) {
    try {
      const { token, addressId } = ctx.request.body
      if (!token) throw new Error("缺少token")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (!userId) throw new Error(verify)
      const deleteAddressRes = await AddressModel.deleteAddress(addressId)
      if (!deleteAddressRes) throw new Error("删除地址失败")
      ctx.body = {
        code: 0,
        msg: "删除地址成功",
        data: null
      }
    } catch (e) {
      console.log(e)
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }

  static async updateAddress (ctx) {
    try {
      const { token, addressInfo } = ctx.request.body
      if (!token) throw new Error("缺少token")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (!userId) throw new Error(verify)

      const { addressId, recipent, phone, address, isdefault } = addressInfo
      if (isdefault == 1) {
        const defaultAddress = await AddressModel.getDefaultAddress(userId)
        if (defaultAddress && defaultAddress.id && defaultAddress.id != addressId) {
          const cancelDefaultRes = await AddressModel.cancelDefaultAddress(defaultAddress.id)
          if (!cancelDefaultRes[0]) throw new Error('取消默认地址失败')
        }
      }
      // 查询有无使用了该地址的订单，有则软删除再创建地址，没有使用则修改地址
      const orderList = await OrderModel.getOrderByAddressId(addressId)

      if (orderList.length > 0) {
        const deleteAddressRes = await AddressModel.deleteAddress(addressId)
        if (!deleteAddressRes) throw new Error("删除地址失败")
        const newAddressId = uuid() // 新地址编号
        const data = { addressId: newAddressId, userId, recipent, phone, address, isdefault }
        const createAddressRes = await AddressModel.createAddress(data)
        if (!createAddressRes) throw new Error("创建地址失败")
      } else {
        const data = { addressId, recipent, phone, address, isdefault }
        const updateAddressRes = await AddressModel.updateAddress(data)
        if (!updateAddressRes[0]) throw new Error('修改地址失败')
      }
      ctx.body = {
        code: 0,
        msg: "修改地址成功",
        data: null
      }

    } catch (e) {
      console.log(e)
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }

  // 获取用户默认地址
  static async getDefaultAddress (ctx) {
    try {
      const { token } = ctx.request.body
      if (!token) throw new Error("缺少token")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (userId) {
        let address = await AddressModel.getDefaultAddress(userId)
        if (!address) {
          const addressList = await AddressModel.getAddressByUserId(userId)
          if (addressList.length > 0) {
            address = addressList[0]
          } else {
            address = null
          }
        }
        address = [address]
        ctx.body = {
          code: 0,
          msg: "获取默认地址成功",
          data: address
        }
      } else {
        throw new Error(verify)
      }
    } catch (e) {
      console.log(e)
      const { message } = e
      if (message.includes("token")) {
        ctx.body = {
          code: -2,
          msg: message,
          data: null
        }
      } else {
        ctx.body = {
          code: -1,
          msg: message,
          data: null
        }
      }
    }
  }
}

module.exports = AddressController