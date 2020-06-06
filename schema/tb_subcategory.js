/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_subcategory', {
    subcategory_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    subcategory_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    category_id: {
      type: DataTypes.STRING(32),
      allowNull: true,
      references: {
        model: 'tb_category',
        key: 'category_id'
      }
    }
  }, {
    tableName: 'tb_subcategory'
  });
};
