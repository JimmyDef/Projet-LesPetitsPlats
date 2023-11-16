import recipes from './../assets/data/recipes.js'
import { renderCards } from './templates/card.js'
import {
  mainSearch,
  searchResult,
  filterByIngredients
} from './modules/search_engine.js'

// let searchResult = recipes
// DOM Filter ingredients ------------------
const ingredientsListDom = document.getElementById('ingredients-list')
// const ingredientsSearch = document.getElementById("ingredients-search");

// DOM Filter devices ------------------
const devicesListDom = document.getElementById('devices-list')
// const devicesSearch = document.getElementById("devices-search");

// DOM Filter ustensils  ------------------
const ustensilsListDom = document.getElementById('ustensils-list')
// const ustensilsSearch = document.getElementById("ustensils-search");

const search = document.getElementById('search')
const headerForm = document.getElementById('header-form')

headerForm.addEventListener('click', (e) => {
  e.preventDefault()
})
search.addEventListener('click', (e) => {
  e.target.value = ''
  mainSearch(recipes)
})

const initPage = () => {
  mainSearch(recipes)
  setIngredientsList(recipes, ingredientsListDom)
  setdevicesList(recipes, devicesListDom)
  setUstensilsList(recipes, ustensilsListDom)
}
// ----------------------------------------------------
// Fonction display des <li> recherche avancée
// ----------------------------------------------------

const renderList = (data, ul) => {
  console.log('🚀 ~ ul:', ul)

  const listarray = [...data]

  ul.innerHTML = ''
  listarray.sort()
  listarray.forEach((ingredient) => {
    const li = document.createElement('li')
    li.className = 'filter__list-li'
    li.textContent = `${ingredient}`

    ul.appendChild(li)
  })
}

// ----------------------------------------------------
// Création liste ingrédient

const setIngredientsList = (data) => {
  if (!Array.isArray(data)) {
    data = [...data]
  }

  const ingredListItem = new Set()
  data.forEach(obj => {
    obj.ingredients.forEach(elt => {
      const formattedString =
        (elt.ingredient.charAt(0).toUpperCase() +
        elt.ingredient.slice(1).toLowerCase()).trim()
      ingredListItem.add(formattedString)
    })
  })

  renderList(ingredListItem, ingredientsListDom)
}

// ----------------------------------------------------
// Création liste Appareils

const setdevicesList = (data) => {
  const devicesListItem = new Set()
  data.forEach(elt => {
    const formattedString = (elt.appliance.charAt(0).toUpperCase() + elt.appliance.slice(1).toLowerCase()).trim()
    devicesListItem.add(formattedString)
  })
  renderList(devicesListItem, devicesListDom)
}

// ----------------------------------------------------
// Création liste ustensiles

const setUstensilsList = (data) => {
  const ustensilListItem = new Set()
  data.forEach(obj => {
    obj.ustensils.forEach((ustenstil) => {
      const stg = (ustenstil.charAt(0).toUpperCase() + ustenstil.slice(1).toLowerCase()).trim()
      ustensilListItem.add(stg)
    }
    )
  })
  renderList(ustensilListItem, ustensilsListDom)
}

initPage()
// export { recipes }
// export { renderCards }
const updateIngredientsListListener = () => {
}

const ingredientsItems = document.querySelectorAll('#ingredients-list > li')
const tagsResult = new Set()
ingredientsItems.forEach((li) => {
  li.addEventListener('click', () => {
    const liTextContent = li.textContent.split(' ')
    filterByIngredients(searchResult, liTextContent, tagsResult)
    searchResult.forEach((recipe) => {
      if (
        recipe.ingredients.some((obj) =>
          liTextContent.every((word) => {
            return obj.ingredient.toLowerCase().includes(word.toLowerCase())
          })
        )
      ) {
        tagsResult.add(recipe)
      }
    })
    renderCards(tagsResult)
    setIngredientsList(tagsResult)
    setdevicesList(tagsResult)
    setUstensilsList(tagsResult)
  })
})
