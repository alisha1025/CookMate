# CookMate

# Overview 

CookMate is an application designed to help users enhance their cooking skills by discovering new recipes and saving them for future reference. Whether you're a beginner or an experienced cook, CookMate provides meal recommendations based on your preferences and allows you to easily save, view, and practice recipes at your convenience. Users can also contribute their own recipes to the platform, creating a diverse library of culinary ideas.

## Key Features:
* Homescreen with user generated recipes
* Authentication for repository of added recipes
* Delete button for any recipes you added but now wish to discard
* _Coming Soon!:_ Favorite button to save recipes to a personal board

# Tech Stack
* Frontend: Handlebars with Vanilla Javascript + JQuery (MVC Pattern)
* Backend: Node.JS
* Database: Postgres

# Installation
1. Clone the repository
```
git clone git@github.com:alisha1025/CookMate.git
cd cookmate
```

2. Make a copy of the Example ENV and set up your own .env variables
```
cd .env.Example
```

3. Download dependencies
```
npm install
```

4. Set up the Database
```
cd db/schema.sql
postgres -U [Usersname]
\i schema.sql
```


5. Set up the Server
```
cd server.js
```

# Running the App
In order to run this app, you go through the initialization steps before navigating to https://localhost:3000. In order to use the out-of-the-box edition on Render, use https://cookmate-755p.onrender.com/. There is no need to initialize when using this link. 


# Contributions
Contributions are welcome! Please feel free to submit a Pull Request.

