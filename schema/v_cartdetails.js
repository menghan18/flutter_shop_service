/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_cartdetails', {
    user_id: {
      type: DataTypes.INTEGER(4).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    goods_id: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    goods_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    goods_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goods_price: {
      type: DataTypes.FLOAT,
      allowNull: true
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
    tableName: 'v_cartdetails'
  });
};
