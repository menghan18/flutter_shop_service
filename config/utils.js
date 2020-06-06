// 根据用户id和当前时间生成订单id
const genOrderId = (userId) => {
  const date = new Date()
  let year = date.getFullYear()
  let month = formatTime(date.getMonth() + 1)
  let day = formatTime(date.getDate())
  let hour = formatTime(date.getHours())
  let minute = formatTime(date.getMinutes())
  let second = formatTime(date.getSeconds())
  return `${year}${month}${day}${hour}${minute}${second}${userId}`
}

// 格式化单位，10以下补0
const formatTime = (unit) => {
  return unit < 10 ? `0${unit}` : unit
}

module.exports = { genOrderId }