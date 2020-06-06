const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const sequelize = new Sequelize('baixing_food', 'root', 'sun520com', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  timezone: '+08:00',
  //搜索功能的like
  operatorsAliases: { $like: Op.like, $gt: Op.gt },
  define: {
    //字符集
    charset: 'utf8',
    //时间戳
    timestamps: false,
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  },
})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize }