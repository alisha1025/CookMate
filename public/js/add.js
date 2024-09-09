// posts the recipe from user input
const createRecipe = async () => {
  const recipeName = $("#recipeName").val().trim();
  const ingredients = $("#ingredients").val().trim();
  const instructions = $("#instructions").val().trim();

  if (recipeName && instructions && ingredients) {
    const response = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify({ recipeName, instructions, ingredients }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Recipe posted");
    } else {
      alert(response.statusText);
    }
  }
};

$(function () {
  // event listener for when the form is submitted using the button
  $("#recipeForm").on("submit", createRecipe);
});
