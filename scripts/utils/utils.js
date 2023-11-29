// ----------------------------------------------------
// Fonction formatage string majuscule 1ère lettre
// ----------------------------------------------------
export const capitalizeFirstLetter = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
}

// ----------------------------------------------------
// Fonction nettoyage input search
// ----------------------------------------------------
export const clearSearchInput = (inputName) => {
  document.getElementById(`${inputName}-search`).value = ''
}

// ----------------------------------------------------
// Fonction echappement caractères spéciaux
// ----------------------------------------------------
export const sanitizeForXSS = (input) => {
  return input.replace(/[<>&"/=]/g, '')
}
