
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
      },
      ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      }
    }, 
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'recipe',
    }
  );
  
  module.exports = Recipe;
