const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserItem extends Model {}

UserItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'item',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_item',
    }
);

module.exports = UserItem;
