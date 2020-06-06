/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_hotgoods', {
    goods_id: {
      type: DataTypes.STRING(32),
      allowNull: false
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
    sales: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'v_hotgoods'
  });
};
