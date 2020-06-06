/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_categorygoods', {
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
    goods_detail: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    goods_amount: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      defaultValue: '100'
    },
    sales: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      defaultValue: '0'
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
    is_recommend: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category_id: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    subcategory_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subcategory_id: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    tableName: 'v_categorygoods'
  });
};
