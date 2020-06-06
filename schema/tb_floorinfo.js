/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_floorinfo', {
    goods_id: {
      type: DataTypes.STRING(32),
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
    },
    floor_id: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      references: {
        model: 'tb_floor',
        key: 'floor_id'
      }
    },
    floor_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'tb_floor',
        key: 'floor_name'
      }
    },
    is_first: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tb_floorinfo'
  });
};
