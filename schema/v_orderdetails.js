/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_orderdetails', {
    orderdetail_id: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    order_id: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    order_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    user_id: {
      type: DataTypes.INTEGER(4).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    order_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    address_id: {
      type: DataTypes.STRING(32),
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
    },
    goods_id: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    goods_count: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    goods_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    goods_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    goods_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    recipent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'v_orderdetails'
  });
};
