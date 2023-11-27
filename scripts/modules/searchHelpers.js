// ------------------------------------------------------
// Fonction Recherche  dans les titres et descriptions
// ------------------------------------------------------
const filterByTitleAndDescription = (
  data,
  searchedWordsArray,
  mergedResults
) => {
  for (const recipe of data) {
    let match = true

    for (const word of searchedWordsArray) {
      const lowerCaseWord = word.toLowerCase()
      const lowerCaseName = recipe.name.toLowerCase()
      const lowerCaseDescription = recipe.description.toLowerCase()
      const nameIncludesWord = lowerCaseName.indexOf(lowerCaseWord) !== -1
      const descriptionIncludesWord =
        lowerCaseDescription.indexOf(lowerCaseWord) !== -1

      if (!(nameIncludesWord || descriptionIncludesWord)) {
        match = false
        break
      }
    }

    if (match) {
      mergedResults.add(recipe)
    }
  }
}
// ------------------------------------------------------
// Fonction Recherche  dans les listes d'ingrédients
// ------------------------------------------------------

const filterByIngredients = (data, searchedWordsArray, mergedResults) => {
  for (const recipe of data) {
    let hasMatchingIngredient = false
    for (const { ingredient } of recipe.ingredients) {
      let isMatchingIngredient = true
      for (const word of searchedWordsArray) {
        if (!ingredient.toLowerCase().includes(word.toLowerCase())) {
          isMatchingIngredient = false
          break
        }
      }

      if (isMatchingIngredient) {
        hasMatchingIngredient = true
        break
      }
    }

    if (hasMatchingIngredient) {
      mergedResults.add(recipe)
    }
  }
}
// ----------------------------------------------------
// Fonction compteur de recette affichées
// ----------------------------------------------------
const updateRecipeCounter = (data) => {
  const recipeCounter = document.getElementById('recipeCounter')
  recipeCounter.innerText = `${data.length} recettes`
}

export {
  filterByIngredients,
  updateRecipeCounter,
  filterByTitleAndDescription
}
