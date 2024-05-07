const sequelize=require ('../config/connection')
const { Model, DataTypes } = require('sequelize');

class Enemy extends Model {}

Enemy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ap:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'enemy', // Changed modelName from 'game' to 'enemy'
  }
);

module.exports = Enemy;
