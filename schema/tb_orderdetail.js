/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_orderdetail', {
    orderdetail_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING(18),
      allowNull: false,
      references: {
        model: 'tb_order',
        key: 'order_id'
      }
    },
    goods_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'tb_goods',
        key: 'goods_id'
      }
    },
    goods_count: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    }
  }, {
    tableName: 'tb_orderdetail'
  });
};
