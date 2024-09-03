
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Recipe extends Model {};


Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      recipeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instructions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tagName: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model:'tag',
            key:'id'
        }
      },
      ingredientUuid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'ingredients',
            key:'id'
        }
    },
},    
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'recipe',
    }
  );
  
  module.exports = Recipe;
