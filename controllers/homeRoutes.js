const router = require("express").Router();
const { User, Recipe, Favorite } = require("../models");

// Route to render the home page
router.get("/", async (req, res) => {
  try {
    // Fetch recent recipes for the home page
    const recipes = await Recipe.findAll({
      limit: 10, // Adjust as needed
      include: [{
        model: User,
        attributes: ['id', 'username']
      }]
      //   order: [["createdAt", "DESC"]],
    });

    // Render the home page with recipes data
    res.render("homepage", {
      title: "Home - CookMate",
      recipes: recipes.map((recipe) => recipe.get({ plain: true })),
      logged_in: req.session.logged_in || false, // Check if the user is logged in
      user_id: req.session.user_id || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the about page
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us - CookMate" });
});

// Route to render the contact page
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us - CookMate" });
});

// redner add page
router.get("/add", async (req, res) => {
    try {
        if (req.session.logged_in) {
            const recipeData = await Recipe.findAll({
                where: { user_id: req.session.user_id },
                include: [{
                  model: User,
                  attributes: ['username']
                }]
            });
            // serialize the data
            const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
            res.render("add", {
                logged_in: req.session.logged_in,
                recipes: recipes,
            });
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// render recipes page
router.get("/recipes", (req, res) => {
    res.render("recipes");
});
  

router.get("/signup", async (req, res) => {
    res.render("signup")
});


router.get("/login", async (req, res) => {
    res.render("login");
});


// redner add page
router.get("/profile", async (req, res) => {
  try {
      if (req.session.logged_in) {
          const userData = await User.findByPk(req.session.user_id);
          const userName = userData.username;

          const favoriteData = await Favorite.findAll({
              where: { user_id: req.session.user_id },
              include: [{
                model: Recipe,
                include: [{ model: User, attributes: ['username'] }]
            }]
          });
          
          // serialize the data
          const favorites = favoriteData.map((favorite) => favorite.get({ plain: true }));
          res.render("profile", {
              logged_in: req.session.logged_in,
              favorites: favorites,
              userName: userName
          });
      } else {
          res.redirect("/login");
      }
  } catch (err) {
      res.status(500).json(err);
  }
});

/* TODO: add this to any route that renders recipes
// Render the recipes view with the data
res.render("recipes", {
    title: "All Recipes - CookMate",
    recipes: recipeData.map(recipe => recipe.get({ plain: true })),
    loggedIn: req.session.logged_in || false
});
*/



// Route to handle logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
