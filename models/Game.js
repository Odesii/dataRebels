const sequelize=require ('../config/connection')
const { Model, DataTypes } = require('sequelize');

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_attack: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        user_defense: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        user_ap: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_ap_img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enemy_hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        enemy_defense:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        enemy_ap: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        action_taken: {
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        turn: {
            type:DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        enemy_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'enemy',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game', // Changed modelName from 'game' to 'enemy'
    }
);

module.exports = Game;
