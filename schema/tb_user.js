/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tb_user', {
    user_id: {
      type: DataTypes.INTEGER(4).UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      references: {
        model: 'tb_user',
        key: 'user_id'
      }
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'tb_user',
        key: 'user_name'
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_user'
  });
};
