const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRES } = require('./config')

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
}

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return "token已过期"
      } else {
        return "token错误"
      }
    }
    return decoded
  })
}

module.exports = { createToken, verifyToken }
