// import recipes from '../../assets/data/recipes.js'
import { renderCards } from '../templates/card.js'
const search = document.getElementById('search')
// let searchResult

// ----------------------------------------------------
// Fonction gestion bar de recherche principal
// ----------------------------------------------------

const mainSearch = (dataRecipes, updatedResult) => {
  search.addEventListener('input', (e) => {
    e.preventDefault()
    const input = e.target.value.trim()

    if (input !== null && input.length >= 3) {
      const searchedWordsArray = input.split(' ')
      const mergedResults = new Set()

      filterByTitleAndDescription(dataRecipes, searchedWordsArray, mergedResults)
      filterByIngredients(dataRecipes, searchedWordsArray, mergedResults)

      updatedResult = [...mergedResults]
      renderCards(updatedResult, e.target.value)
      updateRecipeCounter(updatedResult)
    }
  })
  updatedResult = dataRecipes

  console.log('🚀 ~ updatedResult:', updatedResult)

  renderCards(dataRecipes)
  updateRecipeCounter(dataRecipes)
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
