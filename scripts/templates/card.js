// ----------------------------------------------------
// Fonction display des articles
// ----------------------------------------------------

const renderCards = (recipesData, inputValue) => {
  const articleSection = document.getElementById('card-container')

  if (!recipesData || recipesData.length === 0) {
    articleSection.innerHTML = `<p class="cards-container__no-match-msg">Aucune recette ne contient <span class="cards-container__span">‘${inputValue} ’</span> </br> vous pouvez chercher «
tarte aux pommes », « poisson », etc.<p>`
    return
  }
  articleSection.innerHTML = ' '
  recipesData.forEach((data) => {
    const card = getCardDom(data)
    articleSection.appendChild(card)
  })
}

// -----------------------------------------------------------
// Fonction création de card
// -----------------------------------------------------------

const getCardDom = (data) => {
  const { image, name, ingredients, description, time } = data
  const imgUrl = `./assets/images/${image}`
  const fragment = document.createDocumentFragment()
  const article = document.createElement('article')
  article.className = 'card'
  article.innerHTML = ` 
  <span class="card__timer">${time}min</span>
  <div class="card__img-wrapper">
  <img src="${imgUrl}" alt="${name}" class="card__img">
  </div>
         
 <h2 class="card__title">${name}</h2>
 <p  class="card__recipe">RECETTE</p>
 <p class="card__details">${description}</p>
 <p class="card__ingredients">INGRÉDIENTS</p>`

  const ingredientsWrapper = document.createElement('div')
  ingredientsWrapper.className = 'card__ingredients-wrapper'

  // Boucle pour générer le détails des ingrédients ----------

  ingredients.forEach((elt) => {
    const div = document.createElement('div')
    div.className = 'card__ingredient-details'
    let quantityHtml = ''
    if (elt.quantity) {
      quantityHtml = `
      <p>${elt.quantity}${elt.unit || ''}</p>`
    } else {
      quantityHtml = '<span>-</span>'
    }
    div.innerHTML = `
      <p>${elt.ingredient}</p>${quantityHtml}`

    ingredientsWrapper.appendChild(div)
  })

  article.appendChild(ingredientsWrapper)
  // Fragment pour optimiser la performance --------------------
  fragment.appendChild(article)
  return fragment
}

export { renderCards }
