const router = require("express").Router();
const { Recipe, User } = require("../models");

// Route to get all recipes
router.get("/", async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipeData = await Recipe.findAll({
  
    });

    // Render the recipes view with the data
    res.render("recipes", {
      title: "All Recipes - CookMate",
      recipes: recipeData.map(recipe => recipe.get({ plain: true })),
      loggedIn: req.session.logged_in || false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
