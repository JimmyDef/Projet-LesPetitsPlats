// DOM Filter ingredients ------------------
const ingredientsBtn = document.getElementById('ingredients-btn')
// const ingredientsListDom = document.getElementById("ingredients-list");
// const ingredientsSearch = document.getElementById("ingredients-search");

// DOM Filter devices ------------------
const devicesBtn = document.getElementById('devices-btn')
// const devicesListDom = document.getElementById("devices-list");
// const devicesSearch = document.getElementById("devices-search");

// DOM Filter ustensils  ------------------
const ustensilBtn = document.getElementById('ustensils-btn')
// const ustensilsListDom = document.getElementById("ustensils-list");
// const ustensilsSearch = document.getElementById("ustensils-search");
// const search = document.getElementById("search");

// const ustensilsFilter = document.getElementById("ustensils-filter");
// const devicesFilter = document.getElementById("devices-filter");

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
