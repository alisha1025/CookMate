const sequelize = require('../config/connection');
const {Recipe} = require('../models')

const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
    await sequelize.sync({force:true});

    const recipes = await Recipe.bulkCreate(recipeData, {
        individualHooks: true,
        returning: true,
    });
    // ensures that the script finishes and the Node.js process terminates, avoiding a situation where it might stay running indefinitely due to open connections​⬤
    process.exit(0)
}

// note that i had to use node seed/seed.js to make these updates

seedDatabase()