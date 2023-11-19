// import recipes from '../../assets/data/recipes.js'
import { renderCards } from '../templates/card.js'
const search = document.getElementById('search')
// let searchResult = recipes

// ----------------------------------------------------
// Fonction gestion bar de recherche principal
// ----------------------------------------------------

const mainSearch = (recipes, updatedRecipes) => {
  search.addEventListener('input', (e) => {
    e.preventDefault()
    const input = e.target.value.trim()
    console.log('🚀 ~ recipes:', recipes)
    if (input !== null && input.length >= 3) {
      const searchedWordsArray = input.split(' ')
      const mergedResults = new Set()

      filterByTitleAndDescription(recipes, searchedWordsArray, mergedResults)
      filterByIngredients(recipes, searchedWordsArray, mergedResults)

      recipes = [...mergedResults]
      // updatedRecipes
      renderCards(recipes, e.target.value)
      updateRecipeCounter(recipes)
    }
  })

  renderCards(recipes)
  updateRecipeCounter(recipes)
}

// ------------------------------------------------------
// Fonction Recherche  dans les titres et descriptions
// ------------------------------------------------------

const filterByTitleAndDescription = (data, searchedWordsArray, mergedResults) => {
  data.forEach((recipe) => {
    if (
      searchedWordsArray.every((word) => {
        return (
          recipe.name.toLowerCase().includes(word.toLowerCase()) ||
          recipe.description.toLowerCase().includes(word.toLowerCase())
        )
      })
    ) {
      mergedResults.add(recipe)
    }
  })
}
// ------------------------------------------------------
// Fonction Recherche  dans les listes d'ingrédients
// ------------------------------------------------------
const filterByIngredients = (data, searchedWordsArray, mergedResults) => {
  // if(!Array.isArray(searchedWordsArray))  {}
  const ingredientsResults = data.filter((recipe) => {
    return recipe.ingredients.some((obj) =>

      searchedWordsArray.every((word) => {
        return obj.ingredient.toLowerCase().includes(word.toLowerCase())
      })
    )
  })

  ingredientsResults.forEach((recipe) => mergedResults.add(recipe))
}

// ----------------------------------------------------
// Fonction compteur de recette affichées
// ----------------------------------------------------
const updateRecipeCounter = (data) => {
  const recipeCounter = document.getElementById('recipeCounter')
  recipeCounter.innerText = `${data.length} recettes`
}
export { mainSearch, filterByIngredients, updateRecipeCounter }
