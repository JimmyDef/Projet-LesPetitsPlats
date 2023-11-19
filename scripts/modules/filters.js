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

// ----------------------------------------------------
// Fonction display un menu liste
// ----------------------------------------------------

const expandList = (filterType) => {
  document
    .getElementById(`${filterType}-chevron`)
    .classList.toggle('filter__chevron--up')
  document
    .getElementById(`${filterType}-filter`)
    .classList.toggle('filter__is-collapsed')
}
// ----------------------------------------------------
// Fonction fermer un menu liste
// ----------------------------------------------------
const hideList = (filterType) => {
  document
    .getElementById(`${filterType}-chevron`)
    .classList.remove('filter__chevron--up')
  document
    .getElementById(`${filterType}-filter`)
    .classList.remove('filter__is-collapsed')
}
// ----------------------------------------------------
// ----------------------------------------------------

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

// ----------------------------------------------------
// Fermeture des liste en cas de clic externe
// ----------------------------------------------------
document.addEventListener('click', (e) => {
  const filterBoxes = document.querySelectorAll('.filter__container')
  const filterCollapsed = document.querySelector('.filter__is-collapsed')
  const filterCollapsedChevron = document.querySelector('.filter__chevron--up')

  const isClickInsideInsideDropDow = Array.from(filterBoxes).some((box) =>
    box.contains(e.target)
  )
  if (!isClickInsideInsideDropDow && filterCollapsed !== null) {
    filterCollapsedChevron.classList.remove('filter__chevron--up')
    filterCollapsed.classList.remove('filter__is-collapsed')
  }
})
