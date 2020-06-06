/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_slides', {
    goods_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_goods',
        key: 'goods_id'
      }
    },
    goods_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'tb_goods',
        key: 'goods_name'
      }
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_slides'
  });
};
