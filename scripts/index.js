import { getData } from './utils/fetch.js'
import {
  filterByIngredients,
  updateRecipeCounter,
  filterByTitleAndDescription
} from './modules/searchHelpers.js'
import { renderCards } from './templates/card.js'
import {
  capitalizeFirstLetter,
  clearSearchInput,
  sanitizeForXSS
} from './utils/utils.js'
import { handleCategorySearchFilter } from './modules/filters.js'

// DOM éléments-------------------------------------------
const tagsSection = document.getElementById('tags-container')
const filterSection = document.querySelector('section.filter')
const ingredientsListDom = document.getElementById('ingredients-list')
const devicesListDom = document.getElementById('devices-list')
const ustensilsListDom = document.getElementById('ustensils-list')
const searchInput = document.getElementById('search')
const headerForm = document.getElementById('header-form')
const search = document.getElementById('search')
const searchClearBtn = document.querySelector('.header__input-clear-btn')

// --------------------------------------------------------

const recipes = await getData(
  'https://jimmydef.net/lespetitsplats/assets/data/recipes.json'
)
let searchResult
let tagsList = []

//  searchResult est une variable globale qui contient une liste des recettes correspondant au résultat de la recherche principale.
//  tagsList est une variable globale qui contient une liste des tags sélectionnés.
//  ex: tagsList = [{tag: 'tomate', filter: 'ingredients'}]]
//  La recherche par tags est effectuée sur la variable searchResult si elle existe, sinon sur la liste complète des recettes.

const initPage = () => {
  renderRecipePage(recipes)
  handleCategorySearchFilter()
  headerForm.addEventListener('click', (e) => {
    e.preventDefault()
  })
  searchClearBtn.addEventListener('click', () => {
    search.value = ''
    renderRecipePage(recipes)
  })
}

// ----------------------------------------------------
// Fonction render cards / compteur de recette / listes des filtres
// ----------------------------------------------------

const renderRecipePage = (dataRecipes, inputValue) => {
  renderCards(dataRecipes, inputValue)
  updateRecipeCounter(dataRecipes)
  filtersListHandler(dataRecipes)
}
// ----------------------------------------------------
//  Gestion bar de recherche principal
// ----------------------------------------------------

searchInput.addEventListener('input', (e) => {
  const input = sanitizeForXSS(e.target.value.trim())
  searchResult = recipes
  tagsList = []
  tagsSection.innerHTML = ' '

  if (input === null || input.length < 3) {
    renderRecipePage(recipes, e.target.value)
    return
  }
  if (input !== null && input.length >= 3) {
    const searchedWordsArray = input.split(' ')
    const mergedResults = new Set()

    filterByTitleAndDescription(recipes, searchedWordsArray, mergedResults)
    filterByIngredients(recipes, searchedWordsArray, mergedResults)

    searchResult = [...mergedResults]
    renderRecipePage(searchResult, e.target.value)
  }
})

// ----------------------------------------------------
// Fonction display des <li> recherche avancée
// ----------------------------------------------------

const renderList = (data, elementList, tagType) => {
  const listarray = [...data]
  elementList.innerHTML = ''
  listarray.sort()
  listarray.forEach((item) => {
    // Si l'item figure dans les tags => déplacer en haut de la liste et ajout d'un bouton de suppression.
    // Si l'item ne figure pas dans les tags => ajout d'un eventListener pour ajouter le tag au click.

    if (tagsList.some((elt) => elt.tag === item)) {
      const li = document.createElement('li')
      li.className = 'filter__list-li filter__list-li--selected'
      li.textContent = `${item}`
      li.addEventListener('click', () => {
        const tags = document.querySelectorAll('.tags')
        tags.forEach((tag) => {
          if (tag.textContent === li.textContent) tag.remove()
        })

        tagsList = tagsList.filter(
          (tagOject) => tagOject.tag !== li.textContent
        )
        if (tagsList.length === 0) {
          filterSection.classList.remove('filter--with-tags')
        }
        clearSearchInput(tagType)
        updateRecipesListThroughTags()
      })
      elementList.prepend(li)
      return
    }
    const li = document.createElement('li')
    li.className = 'filter__list-li'
    li.textContent = `${item}`

    li.addEventListener('click', () => {
      tagHandler(item, tagType)
      clearSearchInput(tagType)
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
  btn.innerText = `${tagName}`
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
// Fonction filtrage par Tags
// ----------------------------------------------------
//  Filtrage des recettes en parcourant la liste des tags.
//  Pour chaque tag, on filtre les recettes en fonction de leur catégorie.
//  Filtrage effectué sur le résultat d'une recherche ou sur la liste complète des recettes.
//  Le compteur, la liste des filtres et les cartes sont mis à jour.

const updateRecipesListThroughTags = () => {
  let initialSearchResult = searchResult || recipes
  tagsList.forEach((tagObject) => {
    const tagWordsArray = tagObject.tag.split(' ')

    if (tagObject.filter === 'ingredients') {
      initialSearchResult = initialSearchResult.filter((recipe) => {
        return recipe.ingredients.some((obj) =>
          tagWordsArray.every((word) => {
            return obj.ingredient.toLowerCase().includes(word.toLowerCase())
          })
        )
      })
    }

    if (tagObject.filter === 'devices') {
      initialSearchResult = initialSearchResult.filter(
        (recipe) => recipe.appliance === tagObject.tag
      )
    }

    if (tagObject.filter === 'ustensils') {
      initialSearchResult = initialSearchResult.filter((recipe) => {
        return recipe.ustensils.some(
          (words) => capitalizeFirstLetter(words) === tagObject.tag
        )
      })
    }
  })
  renderRecipePage(initialSearchResult)
}

// ----------------------------------------------------
// Fonction création listes recherche par tag
// ----------------------------------------------------
const filtersListHandler = (dataRecipes) => {
  setIngredientsList(dataRecipes)
  setdevicesList(dataRecipes)
  setUstensilsList(dataRecipes)
}

const setIngredientsList = (data = recipes) => {
  const ingredListItem = new Set()
  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const formattedString = capitalizeFirstLetter(ingredient.ingredient).trim()
      ingredListItem.add(formattedString)
    })
  })

  renderList(ingredListItem, ingredientsListDom, 'ingredients')
}

const setdevicesList = (data = recipes) => {
  const devicesListItem = new Set()
  data.forEach((recipe) => {
    const formattedString = capitalizeFirstLetter(recipe.appliance).trim()
    devicesListItem.add(formattedString)
  })

  renderList(devicesListItem, devicesListDom, 'devices')
}

const setUstensilsList = (data = recipes) => {
  const ustensilListItem = new Set()
  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustenstil) => {
      const formattedString = capitalizeFirstLetter(ustenstil)
      ustensilListItem.add(formattedString)
    })
  })
  renderList(ustensilListItem, ustensilsListDom, 'ustensils')
}

initPage()
