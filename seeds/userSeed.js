const bcrypt = require('bcrypt');
const sequelize = require('../config/connection'); 
const User = require('../config/models/User'); 

const seedUsers = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });

    // Seed user data
    const users = [
      {
        username: 'john_clark',
        password: await bcrypt.hash('password123', 10),
      },
      {
        username: 'joan_jacobs',
        password: await bcrypt.hash('securepassword', 10),
      },
      {
        username: 'alice_knight',
        password: await bcrypt.hash('knight1234', 10),
      },
    ];

    // Inserts user data into the database
    await User.bulkCreate(users);

    console.log('User data has been successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed user data:', error);
    process.exit(1);
  }
};

seedUsers();