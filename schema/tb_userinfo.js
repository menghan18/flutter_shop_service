/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_userinfo', {
    user_id: {
      type: DataTypes.INTEGER(4).UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_user',
        key: 'user_id'
      }
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'https://huangdongyang.cn/images/avatar.jpg'
    },
    sex: {
      type: DataTypes.ENUM('男','女'),
      allowNull: true,
      defaultValue: '男'
    }
  }, {
    tableName: 'tb_userinfo'
  });
};
