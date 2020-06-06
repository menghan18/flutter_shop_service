const UserModel = require('../models/user')
const UserInfoModel = require('../models/userInfo')
const bcrypt = require('bcrypt')
const { createToken, verifyToken } = require('../config/token')
const { SALT_ROUNDS } = require('../config/config')

class UserController {
  // 注册
  static async signin (ctx) {
    try {
      let { userName, password } = ctx.request.body
      if (!userName || !password) {
        ctx.body = {
          code: -2,
          msg: '注册失败：用户名和密码不能为空',
          data: null
        }
        return
      }

      const result = await UserModel.getUserByUserName(userName)
      if (result) {
        ctx.body = {
          code: -3,
          msg: '注册失败：用户名已存在',
          data: null
        }
        return
      }

      // 密码加盐加密
      await bcrypt.hash(password, SALT_ROUNDS).then(hash => {
        password = hash
      }).catch(err => {
        console.log(err)
      })

      const userData = {
        userName, password
      }

      // 创建用户
      const [user, signinResult] = await UserModel.createUser(userData)
      if (signinResult) {
        ctx.body = {
          code: 0,
          msg: '注册成功',
          data: null
        }
      } else {
        return ctx.body = {
          code: -1,
          msg: '注册失败:创建用户失败',
          data: null
        }
      }

      // 创建其他用户信息
      const userInfoData = {
        userId: user.user_id,
        userName: user.user_name
      }
      const [userInfo, createUserInfoResult] = await UserInfoModel.createUserInfo(userInfoData)
      if (createUserInfoResult) {
        ctx.body = {
          code: 0,
          msg: '注册成功',
          data: null
        }
      } else {
        return ctx.body = {
          code: -1,
          msg: '注册失败:创建用户失败',
          data: null
        }
      }

    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message,
        data: null
      }
    }
  }

  // 登录
  static async login (ctx) {
    try {
      const { userName, password } = ctx.request.body
      if (!userName || !password) {
        ctx.body = {
          code: -2,
          msg: '登陆失败：用户名和密码不能为空',
          data: null
        }
        return
      }

      const result = await UserModel.getUserByUserName(userName)
      if (!result) {
        ctx.body = {
          code: -3,
          msg: '登陆失败：用户名不存在',
          data: null
        }
        return
      }

      // 验证密码
      const match = await bcrypt.compare(password, result.password)
      if (match) {
        const payload = {
          userName,
          userId: result.user_id
        }
        // 生成token
        const token = createToken(payload)
        const userInfo = await UserInfoModel.getUserInfoById(result.user_id)
        if (userInfo) {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            data: { token, userAvatar: userInfo.avatar, sex: userInfo.sex }
          }
        } else {
          ctx.body = {
            code: -4,
            msg: '登陆失败：用户信息获取失败',
            data: null
          }
        }
      } else {
        ctx.body = {
          code: -5,
          msg: '登陆失败：密码不正确',
          data: null
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message,
        data: null
      }
      console.log('登陆失败', e)
    }
  }

  // 更改用户信息
  static async updateUserInfo (ctx) {
    try {
      const { token, sex } = ctx.request.body
      if (!token) throw new Error("缺少token")
      // 验证token
      const verify = verifyToken(token)
      // 如果token解析数据中没有所要的数据，说明验证失败
      const { userId } = verify
      if (userId) {
        const res = await UserInfoModel.updateUserSex(userId, sex)
        if (res[0] === 0) throw new Error('修改用户信息失败')
        ctx.body = {
          code: 0,
          msg: "修改用户信息成功",
          data: null
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

module.exports = UserController