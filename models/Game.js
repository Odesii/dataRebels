import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection';

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_ap: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        enemy_hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        enemy_ap: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
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
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game', // Changed modelName from 'game' to 'enemy'
    }
);

export default Game;
