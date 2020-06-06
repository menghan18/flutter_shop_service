/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tb_order', {
    order_id: {
      type: DataTypes.STRING(18),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(4).UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'tb_userinfo',
        key: 'user_id'
      }
    },
    order_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    address_id: {
      type: DataTypes.STRING(32),
      allowNull: true,
      references: {
        model: 'tb_address',
        key: 'id'
      }
    },
    order_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
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
    tableName: 'tb_order'
  });
};
