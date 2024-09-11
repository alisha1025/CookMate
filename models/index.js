const User = require("./User");
const Recipe = require("./Recipe");
const Favorite = require(`./Favorite`);

// Creates a relationship between User and Project model, with the User having a "has many" relationship with Project model.
User.hasMany(Recipe, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Creates a relationship between User and Project model, with a "belongs to" relationship of the Project to the User.
Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Recipe, {
  through: Favorite,
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Creates a relationship between User and Project model, with a "belongs to" relationship of the Project to the User.
Recipe.belongsToMany(User, {
  through: Favorite,
  foreignKey: "recipe_id",
});

// Favorite belongs to User
Favorite.belongsTo(User, {
  foreignKey: "user_id",
});

// Favorite belongs to Recipe
Favorite.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

module.exports = { User, Recipe, Favorite };
