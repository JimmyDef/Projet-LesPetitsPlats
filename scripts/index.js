import recipes from './../assets/data/recipes.js'
import { renderCards } from './templates/card.js'
import { capitalizeFirstLetter } from './utils/utils.js'

// DOM éléments-------------------------------------------
const tagsSection = document.getElementById('tags-container')
const filterSection = document.querySelector('section.filter')

console.log('🚀 ~ filterSection:', filterSection)

const ingredientsListDom = document.getElementById('ingredients-list')
const ingredientsSearch = document.getElementById('ingredients-search')
const devicesListDom = document.getElementById('devices-list')
const devicesSearch = document.getElementById('devices-search')
const ustensilsListDom = document.getElementById('ustensils-list')
const ustensilsSearch = document.getElementById('ustensils-search')
const searchInput = document.getElementById('search')
const headerForm = document.getElementById('header-form')
// --------------------------------------------------------

let searchResult
let tagsList = []
headerForm.addEventListener('click', (e) => {
  e.preventDefault()
})
searchInput.addEventListener('click', (e) => {
  e.target.value = ''
  tagsSection.innerHTML = ' '
  tagsList = []
  mainSearch(recipes)
})

const initPage = () => {
  mainSearch(recipes)
}

// ----------------------------------------------------
// Fonction gestion bar de recherche principal
// ----------------------------------------------------

const mainSearch = (dataRecipes) => {
  renderCards(dataRecipes)
  updateRecipeCounter(dataRecipes)
  listHandler(dataRecipes)
  searchResult = dataRecipes
  searchInput.addEventListener('input', (e) => {
    e.preventDefault()
    const input = e.target.value.trim()

    if (input !== null && input.length >= 3) {
      const searchedWordsArray = input.split(' ')
      const mergedResults = new Set()

      filterByTitleAndDescription(dataRecipes, searchedWordsArray, mergedResults)
      filterByIngredients(dataRecipes, searchedWordsArray, mergedResults)

      searchResult = [...mergedResults]
      listHandler(searchResult)
      renderCards(searchResult, e.target.value)
      updateRecipeCounter(searchResult)
    }
  })
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

// ----------------------------------------------------
// Fonction display des <li> recherche avancée
// ----------------------------------------------------

const renderList = (data, elementList, tagType) => {
  const listarray = [...data]
  elementList.innerHTML = ''
  listarray.sort()
  listarray.forEach((ingredient) => {
    const li = document.createElement('li')
    li.className = 'filter__list-li'
    li.textContent = `${ingredient}`

    li.addEventListener('click', () => {
      console.log('🚀 ~ li:', li)
      tagHandler(ingredient, tagType)
      updateRecipesListThroughTags()
    })

    elementList.appendChild(li)
  })
}
// ----------------------------------------------------
// Fonction display et ajouts des Tags
// ----------------------------------------------------
const tagHandler = (tagName, type) => {
  const newTag = { tag: tagName, filter: type }
  tagsList.push(newTag)
  filterSection.classList.add('filter--with-tags')
  const btn = document.createElement('div')
  btn.className = 'tags'
  btn.innerHTML = `${tagName}`
  const closeImg = document.createElement('img')
  closeImg.src = './assets/icons/cross.svg'
  closeImg.alt = 'croix supprimer le tag'
  closeImg.className = 'tags__cross'
  closeImg.addEventListener('click', () => {
    btn.remove()
    tagsList = tagsList.filter((tagOject) => tagOject.tag !== tagName)
    if (tagsList.length === 0) {
      filterSection.classList.remove('filter--with-tags')
    }
    updateRecipesListThroughTags()
  })

  btn.appendChild(closeImg)
  tagsSection.appendChild(btn)
}
// ----------------------------------------------------
// Fonction recherche par catégorie
// ----------------------------------------------------
const researchByCategory = () => {
  const displayListBySearch = (list, event) => {
    list.forEach((li) => {
      if (
        !li.textContent.toLowerCase().includes(event.target.value.toLowerCase())
      ) {
        li.style.display = 'none'
      }
      if (
        li.textContent.toLowerCase().includes(event.target.value.toLowerCase())
      ) {
        li.style.display = 'block'
      }
    })
  }
  ingredientsSearch.addEventListener('input', (e) => {
    const listOfLi = document.querySelectorAll('#ingredients-list li')
    displayListBySearch(listOfLi, e)
  })
  devicesSearch.addEventListener('input', (e) => {
    const listOfLi = document.querySelectorAll('#devices-list li')
    displayListBySearch(listOfLi, e)
  })
  ustensilsSearch.addEventListener('input', (e) => {
    const listOfLi = document.querySelectorAll('#ustensils-list li')
    displayListBySearch(listOfLi, e)
  })
}
researchByCategory()
// ----------------------------------------------------
// Fonction filtrage par Tags
// ----------------------------------------------------
const updateRecipesListThroughTags = () => {
  let initialSearchResult = searchResult || recipes

  console.log('🚀 ~ initialSearchResult:', initialSearchResult)

  tagsList.forEach((tagObject) => {
    const tagWordsArray = tagObject.tag.split(' ')
    if (tagObject.filter === 'ingredient') {
      initialSearchResult = initialSearchResult.filter((recipe) => {
        return recipe.ingredients.some((obj) =>
          tagWordsArray.every((word) => {
            return obj.ingredient.toLowerCase().includes(word.toLowerCase())
          })
        )
      })
    }
    if (tagObject.filter === 'device') {
      initialSearchResult = initialSearchResult.filter(
        (recipe) => recipe.appliance === tagObject.tag
      )
    }
    if (tagObject.filter === 'ustensil') {
      initialSearchResult = initialSearchResult.filter((recipe) => {
        return recipe.ustensils.some(
          (words) => capitalizeFirstLetter(words) === tagObject.tag
        )
      })
    }
  })

  updateRecipeCounter(initialSearchResult)
  renderCards(initialSearchResult)
  listHandler(initialSearchResult)
}

// ----------------------------------------------------
// Fonction création list recherche par tag
// ----------------------------------------------------
const listHandler = (dataRecipes) => {
  setIngredientsList(dataRecipes)
  setdevicesList(dataRecipes)
  setUstensilsList(dataRecipes)
}
// ----------------------------------------------------
// Création liste ingrédient

const setIngredientsList = (data = recipes) => {
  const ingredListItem = new Set()
  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const formattedString = capitalizeFirstLetter(ingredient.ingredient).trim()
      ingredListItem.add(formattedString)
    })
  })

  renderList(ingredListItem, ingredientsListDom, 'ingredient')
}

// ----------------------------------------------------
// Création liste Appareils

const setdevicesList = (data = recipes) => {
  const devicesListItem = new Set()
  data.forEach((recipe) => {
    const formattedString = capitalizeFirstLetter(recipe.appliance).trim()
    devicesListItem.add(formattedString)
  })

  renderList(devicesListItem, devicesListDom, 'device')
}

// ----------------------------------------------------
// Création liste ustensiles

const setUstensilsList = (data = recipes) => {
  const ustensilListItem = new Set()
  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustenstil) => {
      const formattedString = capitalizeFirstLetter(ustenstil)
      ustensilListItem.add(formattedString)
    })
  })
  renderList(ustensilListItem, ustensilsListDom, 'ustensil')
}

initPage()
