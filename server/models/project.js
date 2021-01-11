'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Project.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' })
            Project.belongsToMany(models.User, { as: 'user', foreignKey: 'projectId', through: models.UserProject })
        }
    };
    Project.init({
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field title is required'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field description is required'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    msg: 'status is required'
                }
            }
        },
        ownerId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field owner is required'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};