// import recipes from './../assets/data/recipes.js'
import { renderCards } from './templates/card.js'

// ----------------------------------------------------
// Fonction gestion bar de recherche principal
// ----------------------------------------------------

const mainFilter = (data) => {
  search.addEventListener('input', (e) => {
    e.preventDefault()
    const input = e.target.value.trim().toLowerCase()

    if (input !== null && input.length >= 3) {
      const searchedWords = input.split(' ')

      // ------------------------------------------------------
      // Recherche des mots clé dans les titres et descriptions
      const resultSet = new Set()
      data.forEach((recipe) => {
        if (searchedWords.every((word) => {
          return (
            recipe.name.toLowerCase().includes(word) ||
            recipe.description.toLowerCase().includes(word)
          )
        })) resultSet.add(recipe)
      })
      // ------------------------------------------------------
      // Recherche des mots clé dans les listes d'ingrédients
      data.forEach((recipe) => {
        if (recipe.ingredients.some((obj) =>
          searchedWords.every((word) => {
            return obj.ingredient.toLowerCase().includes(word)
          })
        )) resultSet.add(recipe)
      })
      const result = [...resultSet]
      renderCards(resultSet)
      updateRecipeCounter(result)
    }
  })
  renderCards(data)
  updateRecipeCounter(data)
}
// ----------------------------------------------------
// Fonction compteur de recette affichées
// ----------------------------------------------------
const updateRecipeCounter = (data) => {
  const recipeCounter = document.getElementById('recipeCounter')
  recipeCounter.innerText = `${data.length} recettes`
}
export { mainFilter }
