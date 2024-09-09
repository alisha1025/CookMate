const router = require("express").Router();
const { Recipe, User } = require("../../models");

// POST ROUTE /api/recipes
router.post('/', async (req, res) => {
    try {
        const newRecipe = await Recipe.create({
            ...req.body,
            user_id: req.session.user_id,
        })
    res.status(200).json(newRecipe); 
    } catch (err) {
        res.status(400).json(err);
    }
})

// Route to get all recipes
router.get("/", async (req, res) => {
  try {
    // Fetch all recipes from the database

    const recipeData = await Recipe.findAll({
  

      res.status(200).json(recipeData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

// DELETE ROUTE /api/recipes/:id
router.delete('/:id', async (req, res) => {
  try {
      // Find the recipe by its ID
      const recipe = await Recipe.findByPk(req.params.id);

      if (!recipe) {
          // If recipe not found, respond with 404 Not Found
          return res.status(404).json({ message: 'Recipe not found' });
      }

      // Check if the recipe belongs to the logged-in user
      if (recipe.user_id !== req.session.user_id) {
          // If not, respond with 403 Forbidden
          return res.status(403).json({ message: 'Unauthorized to delete this recipe' });
      }

      // Delete the recipe
      await recipe.destroy();

      // Respond with a success message
      res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
      console.error(err); // Log error to console
      res.status(500).json(err); // Send error response to client
  }
});

// PUT ROUTE /api/recipes/:id
router.put('/:id', async (req, res) => {
  try {
      // Find the recipe by its ID
      const recipe = await Recipe.findByPk(req.params.id);

      if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
      }

      // Check if the recipe belongs to the logged-in user
      if (recipe.user_id !== req.session.user_id) {
          return res.status(403).json({ message: 'Unauthorized to update this recipe' });
      }

      // Update the recipe with new data
      const updatedRecipe = await recipe.update(req.body);

      // Respond with the updated recipe
      res.status(200).json(updatedRecipe);

    const recipeData = await Recipe.findAll();

    res.status(200).json(recipeData);

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

module.exports = router; 
