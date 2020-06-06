const { v4 } = require('uuid')

const uuid = () => v4().replace(/-/g, "")

module.exports = uuid