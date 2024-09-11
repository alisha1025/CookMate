const router = require("express").Router();
const { Favorite, User, Recipe } = require("../../models");

// /api/favorites

// gets all favorites of a user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Favorite,
          include: [
            {
              model: Recipe,
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const favoriteRecipes = user.Favorites.map((favorite) => favorite.Recipe);

    if (favoriteRecipes.length === 0) {
      return res
        .status(404)
        .json({ message: "No favorite recipes found for this user." });
    }

    res.status(200).json(favoriteRecipes);
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// adds recipe to user's favorites
router.post("/users/:userId/recipes/:recipeId/add", async (req, res) => {
  const { userId, recipeId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the recipe by recipeId
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Add the recipe to the user's favorites through the Favorite junction table
    const favorite = await Favorite.create({
      user_id: userId,
      recipe_id: recipeId,
    });

    return res
      .status(200)
      .json({ message: "Recipe added to favorites successfully", favorite });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred while adding recipe to favorites" });
  }
});

// deletes a recipe from user's favorites
router.delete("/users/:userId/recipes/:recipeId/delete", async (req, res) => {
  const { userId, recipeId } = req.params;

  try {
    const deletedFav = await Favorite.destroy({
      where: {
        user_id: userId,
        recipe_id: recipeId,
      },
    });

    if (deletedFav === 0) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.status(200).json({ message: "Favorite deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
