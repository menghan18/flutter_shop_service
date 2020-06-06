/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_floor', {
    floor_id: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_floor',
        key: 'floor_id'
      }
    },
    floor_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'tb_floor',
        key: 'floor_name'
      }
    },
    floor_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_floor'
  });
};
