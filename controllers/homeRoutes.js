const router = require("express").Router();
const { User, Recipe, Favorite } = require("../models");

// Route to render the home page
router.get("/", async (req, res) => {
  try {
    // Fetch recent recipes for the home page
    const recipes = await Recipe.findAll({
      limit: 10, // Adjust as needed
      //   order: [["createdAt", "DESC"]],
    });

    // Render the home page with recipes data
    res.render("homepage", {
      title: "Home - CookMate",
      recipes: recipes.map((recipe) => recipe.get({ plain: true })),
      loggedIn: req.session.loggedIn || false, // Check if the user is logged in
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

// Route to render the user profile page
router.get("/profile", async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.redirect("/login");
    }

    const user = await User.findByPk(req.session.user_id, {
      include: [
        { model: Recipe, as: "recipes" },
        { model: Favorite, as: "favorites", include: [{ model: Recipe }] },
      ],
    });

    res.render("profile", {
      title: "Your Profile - CookMate",
      user: user.get({ plain: true }),
      recipes: user.recipes.map((recipe) => recipe.get({ plain: true })),
      favorites: user.favorites.map((favorite) =>
        favorite.get({ plain: true })
      ),
      loggedIn: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to handle logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
