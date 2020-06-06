/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_cart', {
    user_id: {
      type: DataTypes.INTEGER(4).UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_userinfo',
        key: 'user_id'
      }
    },
    goods_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_goods',
        key: 'goods_id'
      }
    },
    goods_count: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'tb_cart'
  });
};
