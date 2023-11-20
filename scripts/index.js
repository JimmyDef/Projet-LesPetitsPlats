import recipes from './../assets/data/recipes.js'
import { renderCards } from './templates/card.js'
import { capitalizeFirstLetter } from './utils/utils.js'
import {
  mainSearch, updateRecipeCounter, searchResult

  // filterByIngredients
} from './modules/search_engine.js'
// import { TagObject } from './utils/Tag_object.js'

const tagsSection = document.getElementById('tags-container')

// DOM Filter ingredients ------------------
const ingredientsListDom = document.getElementById('ingredients-list')
// const ingredientsSearch = document.getElementById('ingredients-search')

// DOM Filter devices ------------------
const devicesListDom = document.getElementById('devices-list')
// const devicesSearch = document.getElementById("devices-search");

// DOM Filter ustensils  ------------------
const ustensilsListDom = document.getElementById('ustensils-list')
// const ustensilsSearch = document.getElementById("ustensils-search");

const searchInput = document.getElementById('search')
const headerForm = document.getElementById('header-form')
// const tagsResult = new Set()
// let searchResult = recipes
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
  mainSearch(searchResult)
  setIngredientsList(searchResult, ingredientsListDom)
  setdevicesList(searchResult, devicesListDom)
  setUstensilsList(searchResult, ustensilsListDom)
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
      tagHandler(ingredient, tagType)
      updateRecipesListThroughTags()
      updateRecipeCounter(searchResult)
      renderCards(searchResult)
      setIngredientsList(searchResult)
      setdevicesList(searchResult)
      setUstensilsList(searchResult)

      // updatePageThroughTags()
    })
    elementList.appendChild(li)
  })
}
// const tagsFilters = new Set()

const tagHandler = (tagName, type) => {
  const newTag = { tag: tagName, filter: type }

  const btn = document.createElement('button')
  btn.className = 'tags'
  btn.innerHTML = `${tagName}`
  const closeImg = document.createElement('img')
  closeImg.src = './assets/icons/cross.svg'
  closeImg.alt = 'croix supprimer le tag'
  closeImg.className = 'tags__cross'

  closeImg.addEventListener('click', () => {
    btn.remove()

    tagsList = tagsList.filter((tagOject) => tagOject.tag !== tagName)

    updateRecipesListThroughTags()
    renderCards(searchResult)

    updateRecipeCounter(searchResult)
    setIngredientsList(searchResult)
    setdevicesList(searchResult)
    setUstensilsList(searchResult)
    updateRecipesListThroughTags()
  })
  btn.appendChild(closeImg)
  tagsSection.appendChild(btn)

  tagsList.push(newTag)
}

const updateRecipesListThroughTags = () => {
  tagsList.forEach((tagObject) => {
    const tagWordsArray = tagObject.tag.split(' ')
    if (tagObject.filter === 'ingredient') {
      searchResult = searchResult.filter((recipe) => {
        return recipe.ingredients.some((obj) =>
          tagWordsArray.every((word) => {
            return obj.ingredient.toLowerCase().includes(word.toLowerCase())
          })
        )
      })
    }
    if (tagObject.filter === 'device') {
      searchResult = searchResult.filter(
        (recipe) => recipe.appliance === tagObject.tag
      )
    }
    if (tagObject.filter === 'ustensil') {
      searchResult = searchResult.filter((recipe) => {
        return recipe.ustensils.some(
          (words) => capitalizeFirstLetter(words) === tagObject.tag
        )
      })
    }
  })
}
// ----------------------------------------------------
// Création liste ingrédient

const setIngredientsList = (recipes) => {
  if (!Array.isArray(recipes)) {
    recipes = [...recipes]
  }

  const ingredListItem = new Set()
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const formattedString = capitalizeFirstLetter(ingredient.ingredient).trim()
      ingredListItem.add(formattedString)
    })
  })

  renderList(ingredListItem, ingredientsListDom, 'ingredient')
}

// ----------------------------------------------------
// Création liste Appareils

const setdevicesList = (recipes) => {
  const devicesListItem = new Set()
  recipes.forEach((recipe) => {
    const formattedString = capitalizeFirstLetter(recipe.appliance).trim()
    devicesListItem.add(formattedString)
  })

  renderList(devicesListItem, devicesListDom, 'device')
}

// ----------------------------------------------------
// Création liste ustensiles

const setUstensilsList = (recipes) => {
  const ustensilListItem = new Set()
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustenstil) => {
      const formattedString = capitalizeFirstLetter(ustenstil)
      ustensilListItem.add(formattedString)
    })
  })
  renderList(ustensilListItem, ustensilsListDom, 'ustensil')
}

initPage()
// export { recipes }
// export { renderCards }
