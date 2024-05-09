const sequelize= require ('../config/connection')
const { Model, DataTypes } = require('sequelize');
const bcrypt= require('bcrypt');


class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Corrected to use DataTypes.UUIDV4
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      }
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    character_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'character',
        key: 'id'
      }
    },
    highest_level:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeBulkCreate: async (newUsersData) => {
        for (const user of newUsersData) {
          user.password = await bcrypt.hash(user.password, 10);
        }
        return newUsersData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
