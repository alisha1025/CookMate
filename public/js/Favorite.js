
const addToFavorites = async (userId, recipeId) => {
    try {
      const response = await fetch(`/api/favorites/add?user_id=${userId}&recipe_id=${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        console.log('Recipe added to favorites');
        
      } else {
        console.error('Failed to add recipe to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  document.addEventListener('click', (event) => {
    if (event.target.matches('.favorite-button')) {
      const recipeId = event.target.getAttribute('data-recipe-id');
      const userId = event.target.getAttribute('data-user-id');
      addToFavorites(userId, recipeId);
    }
  });
  
  