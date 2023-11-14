import recipes from './../assets/data/recipes.js'
// import { renderCards } from './templates/card.js'
import { mainFilter } from './filter.js'

const search = document.getElementById('search')
const headerForm = document.getElementById('header-form')

headerForm.addEventListener('click', (e) => {
  e.preventDefault()
})
search.addEventListener('click', (e) => {
  e.target.value = ''
  mainFilter(recipes)
})

const initPage = () => {
  mainFilter(recipes)
}

// DOM Filter ingredients ------------------

const ingredientsBtn = document.getElementById('ingredients-btn')
// const ingredientsList = document.getElementById("ingredients-list");
// const ingredientsSearch = document.getElementById("ingredients-search");

// DOM Filter devices ------------------
const devicesBtn = document.getElementById('devices-btn')
// const devicesList = document.getElementById("devices-list");
// const devicesFilter = document.getElementById("devices-filter");
// const devicesSearch = document.getElementById("devices-search");

// DOM Filter ustensils  ------------------
const ustensilBtn = document.getElementById('ustensils-btn')
// const ustensilsList = document.getElementById("ustensils-list");
// const ustensilsFilter = document.getElementById("ustensils-filter");
// const ustensilsSearch = document.getElementById("ustensils-search");

const expandList = (filterType) => {
  document
    .getElementById(`${filterType}-chevron`)
    .classList.toggle('filter__chevron--up')
  document
    .getElementById(`${filterType}-filter`)
    .classList.toggle('filter__is-collapsed')
}
const hideList = (filterType) => {
  document
    .getElementById(`${filterType}-chevron`)
    .classList.remove('filter__chevron--up')
  document
    .getElementById(`${filterType}-filter`)
    .classList.remove('filter__is-collapsed')
}

ingredientsBtn.addEventListener('click', () => {
  expandList('ingredients')
  hideList('devices')
  hideList('ustensils')
})
devicesBtn.addEventListener('click', () => {
  expandList('devices')
  hideList('ingredients')
  hideList('ustensils')
})
ustensilBtn.addEventListener('click', () => {
  expandList('ustensils')
  hideList('devices')
  hideList('ingredients')
})

initPage()
// export { recipes }
// export { renderCards }
