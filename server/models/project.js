'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User, {
        through: 'ProjectUsers',
        foreignkey: 'ProjectId',
      });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      CreatorId: {
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Users' }, key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
