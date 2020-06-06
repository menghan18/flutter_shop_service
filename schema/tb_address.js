/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tb_address', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(4).UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'tb_userinfo',
        key: 'user_id'
      }
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
    },
    isdefault: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    // isdelete: {
    //   type: DataTypes.INTEGER(1),
    //   allowNull: true,
    //   defaultValue: '0'
    // },
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
    tableName: 'tb_address',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'destroy_time',
    paranoid: true,
  });
};
